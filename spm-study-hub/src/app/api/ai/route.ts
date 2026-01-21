import { NextRequest, NextResponse } from 'next/server';
import { AI_SYSTEM_PROMPT, formatChapterContext } from '@/lib/groq';

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  message: string;
  chapterContext?: {
    chapterNumber: number;
    chapterTitle: string;
    currentSlideTitle?: string;
  };
  messageHistory?: AIMessage[];
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY not configured' },
        { status: 500 }
      );
    }

    const body: RequestBody = await request.json();
    const { message, chapterContext, messageHistory = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build the system prompt with context
    let systemPrompt = AI_SYSTEM_PROMPT;
    if (chapterContext) {
      const contextStr = formatChapterContext(
        chapterContext.chapterNumber,
        chapterContext.chapterTitle,
        chapterContext.currentSlideTitle
      );
      systemPrompt += `\n\nCurrent Context: ${contextStr}`;
    }

    // Build messages array for the API
    const messages = [
      { role: 'system', content: systemPrompt },
      ...messageHistory.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user', content: message },
    ];

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'No response generated';

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
