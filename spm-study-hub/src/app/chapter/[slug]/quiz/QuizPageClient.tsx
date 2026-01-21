'use client';

import { Home, BookOpen, Layers } from 'lucide-react';
import { Chapter } from '@/data/chapters/types';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { AIAssistant } from '@/components/ai/AIAssistant';

interface QuizPageClientProps {
  chapter: Chapter;
}

export function QuizPageClient({ chapter }: QuizPageClientProps) {
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
          <Layers className="h-5 w-5" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap">
            Chapters
          </span>
        </a>
        <a
          href={`/chapter/${chapter.slug}`}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-card/90 text-muted-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-card hover:text-foreground hover:scale-105"
        >
          <BookOpen className="h-5 w-5" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap">
            View Slides
          </span>
        </a>
      </div>

      {/* Quiz */}
      <QuizContainer chapter={chapter} />

      {/* AI Assistant */}
      <AIAssistant
        chapterNumber={chapter.chapterNumber}
        chapterTitle={chapter.title}
      />
    </div>
  );
}
