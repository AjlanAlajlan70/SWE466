'use client';

import { getAllChapters } from '@/data/chapters';
import { useProgress } from '@/hooks/useProgress';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { ChapterCard } from '@/components/home/ChapterCard';
import { QuizCard } from '@/components/home/QuizCard';
import { AIAssistant } from '@/components/ai/AIAssistant';

export default function Home() {
  const chapters = getAllChapters();
  const { getChapterProgress, isLoaded } = useProgress();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Chapters Section */}
        <section id="chapters" className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Course Chapters
              </h2>
              <p className="mt-3 text-muted-foreground">
                Start your journey through Software Project Management
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  progress={getChapterProgress(chapter.id)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quizzes Section */}
        <section id="quizzes" className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                Chapter Quizzes
              </h2>
              <p className="mt-3 text-muted-foreground">
                Test your knowledge after completing each chapter
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter, index) => (
                <QuizCard
                  key={chapter.id}
                  chapter={chapter}
                  progress={getChapterProgress(chapter.id)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
