import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

type ChatMode = 'learn' | 'interview';

interface ChatRequestBody {
  messages?: UIMessage[];
  topic?: string;
  mode?: ChatMode;
  conceptTitle?: string;
  conceptSummary?: string;
  starterPrompts?: string[];
}

export const maxDuration = 30;

function buildSystemPrompt({
  mode,
  topic,
  conceptTitle,
  conceptSummary,
  starterPrompts,
}: {
  mode: ChatMode;
  topic: string;
  conceptTitle?: string;
  conceptSummary?: string;
  starterPrompts: string[];
}) {
  if (mode === 'learn') {
    const conceptName = conceptTitle?.trim() || topic;
    const summaryLine = conceptSummary?.trim() ? `Concept summary provided by the page: ${conceptSummary.trim()}` : '';
    const startersLine =
      starterPrompts.length > 0
        ? `Preferred starter prompts from UI: ${starterPrompts.map((prompt) => `- ${prompt}`).join('\n')}`
        : '';

    return `You are a senior technical mentor helping a developer learn interview topics.
Topic: ${topic}
Concept focus: ${conceptName}
${summaryLine}
${startersLine}
Rules:
1. The first response must explain the concept clearly, give one realistic example, and ask one follow-up question.
2. Keep answers practical, concise, and interview-oriented.
3. If asked for more depth, provide tradeoffs, pitfalls, and debugging guidance.
4. Use markdown code blocks for code examples.`;
  }

  return `You are a tough but fair technical interviewer for a Senior Full Stack Developer position.
The candidate is practicing for the topic: ${topic}.
Rules:
1. Start with a direct conceptual or practical question.
2. Evaluate user answers briefly, then ask a stronger follow-up.
3. Keep responses concise and structured (usually below 150 words).
4. If the user asks for help, coach them toward the answer with examples.
5. Use markdown code blocks when code is relevant.`;
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as ChatRequestBody;

    const mode: ChatMode = payload.mode === 'learn' ? 'learn' : 'interview';
    const topic = typeof payload.topic === 'string' && payload.topic.trim() ? payload.topic.trim() : 'General';
    const conceptTitle = typeof payload.conceptTitle === 'string' ? payload.conceptTitle : undefined;
    const conceptSummary = typeof payload.conceptSummary === 'string' ? payload.conceptSummary : undefined;
    const starterPrompts = Array.isArray(payload.starterPrompts)
      ? payload.starterPrompts.filter((item): item is string => typeof item === 'string').slice(0, 5)
      : [];
    const messages = Array.isArray(payload.messages) ? payload.messages : [];

    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-flash-latest'),
      system: buildSystemPrompt({ mode, topic, conceptTitle, conceptSummary, starterPrompts }),
      messages: modelMessages,
      temperature: mode === 'learn' ? 0.4 : 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('AI Route Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to initialize AI. Ensure GOOGLE_GENERATIVE_AI_API_KEY is set in .env.local.',
      }),
      { status: 500 },
    );
  }
}
