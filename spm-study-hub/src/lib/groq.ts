interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  response: string;
  error?: string;
}

/**
 * Send a message to the AI assistant
 */
export async function askAI(
  message: string,
  chapterContext?: {
    chapterNumber: number;
    chapterTitle: string;
    currentSlideTitle?: string;
  },
  messageHistory: AIMessage[] = []
): Promise<AIResponse> {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        chapterContext,
        messageHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { response: data.response };
  } catch (error) {
    console.error('AI Assistant Error:', error);
    return {
      response: '',
      error: error instanceof Error ? error.message : 'Failed to get AI response',
    };
  }
}

/**
 * Format chapter context for the AI
 */
export function formatChapterContext(
  chapterNumber: number,
  chapterTitle: string,
  currentSlideTitle?: string
): string {
  let context = `Currently studying Chapter ${chapterNumber}: ${chapterTitle}`;
  if (currentSlideTitle) {
    context += ` - Current topic: ${currentSlideTitle}`;
  }
  return context;
}

/**
 * System prompt for the AI assistant
 */
export const AI_SYSTEM_PROMPT = `You are an SPM Study Assistant helping students understand their course material. Your goal is to CLARIFY and REINFORCE what students are learning from their slides.

**CRITICAL RULES - FOLLOW STRICTLY:**
1. ONLY discuss topics that are covered in the current chapter context provided
2. DO NOT introduce new concepts or advanced topics not in the slides
3. DO NOT go off-topic or ramble - keep answers focused and relevant
4. If a student asks about something outside the chapter scope, say "That topic is covered in a different chapter. For now, let's focus on [current chapter topic]."
5. Keep answers CONCISE - students need clarity, not walls of text

**Format your responses using Markdown:**
- Use **bold** for key terms from the slides
- Use bullet points for lists (keep them short)
- Use > for important takeaways
- Use ### for headers only when needed

**Chapter 1 Topics (Introduction to SPM):**
- What is a project? (temporary, unique, progressive elaboration)
- Project characteristics (objectives, constraints, teams, risk)
- What makes software projects unique (intangibility, malleability, complexity)
- Common software project challenges
- What is project management?
- The Triple Constraint (Scope, Time, Cost)
- Role of the Project Manager (planning, organizing, leading, controlling)
- PM skills (technical, leadership, management, communication)
- SDLC phases (requirements, design, implementation, testing, deployment, maintenance)
- Waterfall vs Agile approaches
- Why projects fail (unclear requirements, poor communication, scope creep)
- Keys to project success

**Response Style:**
- Be direct and helpful
- Use simple language
- Give short, clear explanations
- If asked for examples, use ones directly related to the slide content
- For quiz help, guide understanding without giving away answers

Remember: Your job is to help students UNDERSTAND their slides, not to teach them new material.`;
