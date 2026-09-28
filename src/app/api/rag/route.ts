import { NextResponse } from "next/server";
import ragData from "@/rag/rag-data.json";

interface RagDataItem {
  id: string;
  title: string;
  content: string;
  email?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  whatsapp?: string;
}

interface GeminiStreamChunk {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query as string;
    const history = body.history || [];

    // Allow file-only messages (no text, just attachment) — block only if truly empty
    const hasAttachments = body.attachments && body.attachments.length > 0;
    if (!query && !hasAttachments) {
      return NextResponse.json({ answer: "Please ask a question or attach a file!" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "API key is missing. Please check your environment variables.",
      });
    }

    const timeZone = body.timeZone || "UTC";

    // Build the system instruction with full context injection
    const systemPrompt = buildSystemPrompt(timeZone);

    // gemini-3.5-flash model
    const modelName = "gemini-flash-latest";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`;

    // Map history to Gemini API contents structure, ensuring strict alternation and no empty text.
    // NOTE: History attachments loaded from localStorage have their base64 data stripped to ""
    // to prevent QuotaExceeded. We intentionally skip those inlineData parts — do NOT send
    // empty data to Gemini as it will cause a 400 INVALID_ARGUMENT error.
    const contents = history
      .filter((msg: any) => (msg.text && msg.text.trim() !== "") || (msg.attachments && msg.attachments.some((a: any) => a.data)))
      .map((msg: any) => {
        const parts: any[] = [];
        if (msg.text) parts.push({ text: msg.text });
        if (msg.attachments && msg.attachments.length > 0) {
          msg.attachments.forEach((att: any) => {
            // Only include inlineData if the base64 data is actually present
            if (att.data) {
              parts.push({
                inlineData: {
                  mimeType: att.mimeType,
                  data: att.data,
                },
              });
            }
          });
        }
        // Ensure this turn still has at least one part after filtering
        if (parts.length === 0) return null;
        return {
          role: msg.sender === "user" ? "user" : "model",
          parts,
        };
      })
      .filter(Boolean); // Remove nulls from turns that had only stripped attachments

    // Add current user query parts
    const currentUserParts: any[] = [];
    if (query) currentUserParts.push({ text: query });
    if (body.attachments && body.attachments.length > 0) {
      body.attachments.forEach((att: any) => {
        // Guard: only push inlineData when data is a non-empty string
        if (att.data && att.mimeType) {
          currentUserParts.push({
            inlineData: {
              mimeType: att.mimeType,
              data: att.data,
            },
          });
        }
      });
    }

    // Only push if we have actual content — empty parts array causes Gemini 400
    if (currentUserParts.length > 0) {
      contents.push({
        role: "user",
        parts: currentUserParts,
      });
    } else {
      // This should never happen given the guard above, but if it does, return early
      return NextResponse.json({ answer: "Please include a message or a valid file." });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          // 8192 tokens supports full document analysis, detailed resumes, and long explanations
          // without ever truncating mid-sentence. Gemini Flash supports up to 8192 output tokens.
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API Error:", response.status, errorData);

      // Map raw API errors to clean, user-friendly messages
      const friendlyError = getFriendlyError(response.status, errorData);
      return NextResponse.json({ answer: friendlyError });
    }

    // Create a ReadableStream to forward the SSE data with proper accumulation
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (value) {
              buffer += decoder.decode(value, { stream: !done });
            } else if (done) {
              buffer += decoder.decode(); // flush remaining bytes
            }

            const lines = buffer.split("\n");
            
            // If not done, keep the last incomplete line in the buffer
            if (!done) {
              buffer = lines.pop() || "";
            } else {
              buffer = "";
            }

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const jsonStr = line.slice(6).trim();

                if (jsonStr === "" || jsonStr === "[DONE]") continue;

                try {
                  const data = JSON.parse(jsonStr) as GeminiStreamChunk;
                  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

                  if (text) {
                    // Send each chunk immediately
                    controller.enqueue(encoder.encode(text));
                  }

                  // Distinguish finish reasons — MAX_TOKENS means truncation, not clean completion
                  const finishReason = data.candidates?.[0]?.finishReason;
                  if (finishReason) {
                    if (finishReason === 'MAX_TOKENS') {
                      // Response was cut off by token limit — notify the user clearly
                      controller.enqueue(encoder.encode(
                        "\n\n(Response reached its length limit. Ask me to continue or be more specific to get a focused answer.)"
                      ));
                    }
                    try { controller.close(); } catch(e) {}
                    return;
                  }
                } catch (parseError) {
                  console.error("Error parsing chunk:", parseError, "Line:", jsonStr);
                }
              }
            }

            if (done) {
              try { controller.close(); } catch (e) {}
              break;
            }
          }
        } catch (error) {
          console.error("Stream reading error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("RAG API error:", err);
    return NextResponse.json({
      answer: "Flamo ran into an unexpected issue. Please try again in a moment.",
    });
  }
}

function getFriendlyError(status: number, errorData: any): string {
  const message: string = errorData?.error?.message || "";

  // Quota / rate limit
  if (status === 429 || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate")) {
    return "Flamo is a bit busy right now — too many questions at once! Please wait a moment and try again.";
  }

  // Model overloaded / service unavailable
  if (status === 503 || message.toLowerCase().includes("overload") || message.toLowerCase().includes("unavailable")) {
    return "Flamo is temporarily unavailable due to high demand. Please try again in a few seconds.";
  }

  // Invalid API key / auth
  if (status === 401 || status === 403 || message.toLowerCase().includes("api key") || message.toLowerCase().includes("permission")) {
    return "Flamo isn't properly configured at the moment. Please contact Emmanuel directly at great@exoper.com.";
  }

  // Bad request (e.g. invalid history format)
  if (status === 400) {
    return "Flamo couldn't understand that request. Try rephrasing your question.";
  }

  // Catch-all
  return "Flamo is having a moment. Please try again shortly.";
}

function buildSystemPrompt(userTimeZone: string): string {
  const typedRagData = ragData as RagDataItem[];
  const fullContext = typedRagData.map(item => {
    let content = `### ${item.title}\n${item.content}`;
    if (item.email) content += `\nEmail: ${item.email}`;
    if (item.github) content += `\nGitHub: ${item.github}`;
    if (item.linkedin) content += `\nLinkedIn: ${item.linkedin}`;
    if (item.portfolio) content += `\nPortfolio: ${item.portfolio}`;
    if (item.whatsapp) content += `\nWhatsApp: ${item.whatsapp}`;
    return content;
  }).join('\n\n');

  return `You are Flamo, the personal AI assistant of Emmanuel U. Iziogo — a Senior Software Engineer, AI specialist, and founder of Softverse. You were built specifically for Emmanuel's portfolio site to help visitors learn about him in an intelligent, engaging way.

Your identity:
- Name: Flamo
- Role: Emmanuel's dedicated AI portfolio assistant
- Creator: Emmanuel U. Iziogo
- Purpose: To represent Emmanuel's work, skills, and experience to potential clients, employers, and collaborators.

You embody:
- Expertise: Senior-level technical knowledge across AI/ML, software engineering, and digital innovation.
- Professionalism: Enterprise-grade communication with strategic insight.
- Personality: Authentic, engaging, and subtly witty without compromising credibility.
- Precision: Data-driven, context-aware responses with zero hallucination tolerance.

If anyone asks who you are, say: "I'm Flamo, Emmanuel's AI assistant. I'm here to help you learn about his work, skills, and experience."

## FULL KNOWLEDGE BASE
Below is the comprehensive, official data regarding Emmanuel's portfolio, skills, experience, and contact details. Use this as your absolute source of truth.

${fullContext}

## RESPONSE PROTOCOL
Primary Objectives:
1. Extract and synthesize relevant information from the knowledge base with 100% accuracy.
2. Deliver insights that showcase Emmanuel's unique value proposition and technical depth.
3. Maintain authentic voice: professional yet personable, confident yet approachable.
4. Seamlessly handle follow-up questions using the conversation history provided.

Quality Standards:
- Accuracy: Only cite information explicitly present in the context; flag gaps transparently.
- Brevity: For simple conversational questions, target 300-500 tokens. For file analysis, document review, or detailed technical questions, respond completely and thoroughly — do not truncate. Always complete your final sentence.
- Tone: Calibrated professionalism — think "senior consultant" not "corporate robot".
- Pronouns: Use "he/him" when referencing Emmanuel; maintain grammatical consistency.
- Formatting: DO NOT use markdown bold/italics (like **) or headers (##). The frontend only supports plain text. You may use simple dashes (-) for lists and blank lines for spacing.

Failure Modes to Avoid:
- Generic platitudes or filler content.
- Information not grounded in provided context.
- Overly casual language that undermines expertise.
- Robotic or templated responses.

## APPOINTMENT BOOKING
The user chatting with you is currently in the following timezone: ${userTimeZone}
If they want to book a meeting, schedule a call, or consult with Emmanuel, you must collect:
1. Their Name
2. Their Email
3. Duration ("15min" or "30min")
4. Date (YYYY-MM-DD)
5. Time (HH:MM in 24h format. IMPORTANT: This MUST be the agreed time in THEIR local timezone (${userTimeZone}). Do not output the time in Lagos time unless they are in Lagos.)

If any of this information is missing, politely ask the user for it. Make sure you both agree on the time based on their timezone.
Once you have ALL 5 pieces of information, output the following EXACT tag on a new line at the end of your response (DO NOT wrap it in markdown code blocks or backticks):
[BOOK_MEETING: {"name": "...", "email": "...", "duration": "...", "date": "...", "time": "..."}]

Generate response:`;
}
