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

interface PromptConfig {
  maxTokens?: number;
  responseStyle?: 'concise' | 'detailed' | 'adaptive';
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query as string;
    const history = body.history || [];

    if (!query) {
      return NextResponse.json({ answer: "Please ask a question!" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "API key is missing. Please check your environment variables.",
      });
    }

    // Build the system instruction with full context injection
    const systemPrompt = buildSystemPrompt({
      maxTokens: 300,
      responseStyle: 'adaptive'
    });

    // Gemini 3.5 Flash model with streaming
    const modelName = "gemini-3.5-flash";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`;

    // Map history to Gemini API contents structure, ensuring strict alternation and no empty text
    const contents = history
      .filter((msg: any) => msg.text && msg.text.trim() !== "")
      .map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

    // Add current user query
    contents.push({
      role: 'user',
      parts: [{ text: query }]
    });

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
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return NextResponse.json({
        answer: `API Error: ${errorData.error?.message || "Unknown error"}`,
      });
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

            if (done) {
              controller.close();
              break;
            }

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            
            // Keep the last incomplete line in the buffer
            buffer = lines.pop() || "";

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

                  // Check if generation is complete
                  if (data.candidates?.[0]?.finishReason) {
                    controller.close();
                    return;
                  }
                } catch (parseError) {
                  console.error("Error parsing chunk:", parseError, "Line:", jsonStr);
                }
              }
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
      answer: "Sorry, I'm having trouble responding right now. Please try again!",
    });
  }
}

function buildSystemPrompt(
  config: PromptConfig = {}
): string {
  const { 
    maxTokens = 300, 
    responseStyle = 'adaptive' 
  } = config;

  const typedRagData = ragData as RagDataItem[];
  const fullContext = typedRagData.map(item => {
    let content = `### ${item.title}\n${item.content}`;
    if (item.email) content += `\nEmail: ${item.email}`;
    if (item.github) content += `\nGitHub: ${item.github}`;
    if (item.linkedin) content += `\nLinkedIn: ${item.linkedin}`;
    if (item.portfolio) content += `\nPortfolio: ${item.portfolio}`;
    return content;
  }).join('\n\n');

  return `You are an elite AI assistant representing Emmanuel U. Iziogo's professional portfolio. You embody:
- **Expertise**: Senior-level technical knowledge across AI/ML, software engineering, and digital innovation.
- **Professionalism**: Enterprise-grade communication with strategic insight.
- **Personality**: Authentic, engaging, and subtly witty without compromising credibility.
- **Precision**: Data-driven, context-aware responses with zero hallucination tolerance.

## FULL KNOWLEDGE BASE
Below is the comprehensive, official data regarding Emmanuel's portfolio, skills, experience, and contact details. Use this as your absolute source of truth.

${fullContext}

## RESPONSE PROTOCOL
**Primary Objectives:**
1. Extract and synthesize relevant information from the knowledge base with 100% accuracy.
2. Deliver insights that showcase Emmanuel's unique value proposition and technical depth.
3. Maintain authentic voice: professional yet personable, confident yet approachable.
4. Seamlessly handle follow-up questions using the conversation history provided.

**Quality Standards:**
- **Accuracy**: Only cite information explicitly present in the context; flag gaps transparently.
- **Brevity**: Target ${maxTokens} tokens unless complexity demands expansion (auto-detect).
- **Tone**: Calibrated professionalism—think "senior consultant" not "corporate robot".
- **Pronouns**: Use "he/him" when referencing Emmanuel; maintain grammatical consistency.
- **Formatting**: DO NOT use markdown bold/italics (like **) or headers (##). The frontend only supports plain text. You may use simple dashes (-) for lists and blank lines for spacing.

**Failure Modes to Avoid:**
- Generic platitudes or filler content.
- Information not grounded in provided context.
- Overly casual language that undermines expertise.
- Robotic or templated responses.

Generate response:`;
}
