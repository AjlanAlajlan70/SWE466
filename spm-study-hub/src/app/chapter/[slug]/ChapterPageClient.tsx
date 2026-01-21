'use client';

import { useState, useCallback, useRef } from 'react';
import { Home, ClipboardList, BookOpen } from 'lucide-react';
import { Chapter } from '@/data/chapters/types';
import { SlideContainer } from '@/components/slides/SlideContainer';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { TextSelectionPopup } from '@/components/ai/TextSelectionPopup';

interface ChapterPageClientProps {
  chapter: Chapter;
}

export function ChapterPageClient({ chapter }: ChapterPageClientProps) {
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const aiRef = useRef<{ sendMessage: (msg: string) => void; openChat: () => void } | null>(null);

  const handleAskAI = useCallback((text: string) => {
    if (aiRef.current) {
      aiRef.current.sendMessage(text);
    } else {
      setAiMessage(text);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Navigation */}
      <div className="fixed left-4 top-4 z-50 flex items-center gap-2 md:left-8">
        <a
          href="/"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-foreground hover:scale-105"
        >
          <Home className="h-5 w-5" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap">
            Home
          </span>
        </a>
        <a
          href="/#chapters"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-foreground hover:scale-105"
        >
          <BookOpen className="h-5 w-5" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap">
            Chapters
          </span>
        </a>
        <a
          href={`/chapter/${chapter.slug}/quiz`}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-coral-500 to-teal-500 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          <ClipboardList className="h-5 w-5" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap">
            Take a Quiz
          </span>
        </a>
      </div>

      {/* Slides */}
      <SlideContainer chapter={chapter} isAISidebarOpen={isAIOpen} />

      {/* Text Selection Popup */}
      <TextSelectionPopup onAskAI={handleAskAI} />

      {/* AI Assistant */}
      <AIAssistant
        chapterNumber={chapter.chapterNumber}
        chapterTitle={chapter.title}
        initialMessage={aiMessage}
        onRef={(ref) => { aiRef.current = ref; }}
        onOpenChange={setIsAIOpen}
      />
    </div>
  );
}
