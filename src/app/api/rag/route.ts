import { NextResponse } from "next/server";
import ragData from "@/rag/rag-data.json";

interface RagDataItem {
  id: string;
  title: string;
  content: string;
}

interface GeminiStreamChunk {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body.query as string;

    if (!query) {
      return NextResponse.json({ answer: "Please ask a question!" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        answer: "API key is missing. Please check your environment variables.",
      });
    }

    // Search for relevant context in portfolio data
    const relevantContext = findRelevantContext(query);

    // Build the prompt
    const prompt = buildPrompt(query, relevantContext);

    // Gemini 2.5 Flash model with streaming
    const modelName = "gemini-2.5-flash";
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      return NextResponse.json({
        answer: `API Error: ${errorData.error?.message || "Unknown error"}`,
      });
    }

    // Create a ReadableStream to forward the SSE data
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              controller.close();
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const jsonStr = line.slice(6);

                if (jsonStr.trim() === "") continue;

                try {
                  const data = JSON.parse(jsonStr) as GeminiStreamChunk;
                  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

                  if (text) {
                    // Send only the text content
                    controller.enqueue(new TextEncoder().encode(text));
                  }
                } catch (parseError) {
                  console.error("Error parsing chunk:", parseError);
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
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("RAG API error:", err);
    return NextResponse.json({
      answer:
        "Sorry, I'm having trouble responding right now. Please try again!",
    });
  }
}

// Find relevant context from your portfolio data
function findRelevantContext(query: string): string[] {
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(" ");

  const typedRagData = ragData as RagDataItem[];

  const scored = typedRagData.map((item) => {
    const contentLower = item.content.toLowerCase();
    const titleLower = item.title.toLowerCase();

    // Count keyword matches
    let score = 0;
    keywords.forEach((keyword) => {
      if (contentLower.includes(keyword)) score += 2;
      if (titleLower.includes(keyword)) score += 3;
    });

    return { item, score };
  });

  // Return items with score > 0, sorted by relevance
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3) // Top 3 most relevant
    .map((s) => `${s.item.title}: ${s.item.content}`);
}

// Build the prompt for Gemini
function buildPrompt(query: string, context: string[]): string {
  if (context.length > 0) {
    // Portfolio-related question
    return `You are a fun, witty AI assistant for Emmanuel U. Iziogo's portfolio website. You're helpful but not boring - think of yourself as her digital spokesperson with personality!

CONTEXT FROM PORTFOLIO:
${context.join("\n\n")}

USER QUESTION: ${query}

Instructions:
- Answer using the context provided, but make it fun and engaging
- Be conversational with a tiny touch of sass - like talking to a friend who happens to be super knowledgeable
- You can use light humor, relevant emojis (sparingly!), and a semi-casual tone
- Keep it professional enough for a portfolio site, but not corporate-boring
- Refer to Ifeoluwa as "she" or by her name (or just "Ife" if it fits naturally)
- Keep responses under 100 words unless the question clearly needs more detail
- If something's impressive, hype it up a bit! Show enthusiasm

Answer:`;
  } else {
    // General question (not about portfolio)
    return `You are a fun, helpful AI assistant living on Emmanuel U. Iziogo's portfolio website and offering to share knowledge about Ifeoluwa or general questions not relating to ifeoluwa by prompting the user to ask whatever they might need to know.

USER QUESTION: ${query}

Instructions:
- This isn't about Ifeoluwa's portfolio, so just answer it like the cool, knowledgeable AI you are
- Be friendly, and engaging - add personality to your responses
- You can use light humor and casual language
- Keep responses under 100 words unless the question needs more
- If asked about Ifeoluwa and you don't have context, be honest but cool about it: "I don't have that info, but you can explore the site or reach out to her directly!"

Answer:`;
  }
}

