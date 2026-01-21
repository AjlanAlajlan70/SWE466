'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, BookCheck } from 'lucide-react';
import { Chapter, ChapterProgress } from '@/data/chapters/types';
import { cn } from '@/lib/utils';
import { cardHover } from '@/lib/animations';

interface ChapterCardProps {
  chapter: Chapter;
  progress?: ChapterProgress;
  index: number;
}

export function ChapterCard({ chapter, progress, index }: ChapterCardProps) {
  const isStarted = progress !== undefined;
  const isSlidesFinished = progress?.slidesCompleted === true;
  const isComplete = isSlidesFinished && progress?.quizScore;
  const quizScore = progress?.quizScore?.percentage;

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className={cn(
        'group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-colors',
        'hover:border-coral-300'
      )}
    >
      <Link href={`/chapter/${chapter.slug}`} className="block">
        {/* Chapter Number Badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-teal-500 text-lg font-medium text-white">
            {chapter.chapterNumber}
          </span>

          {/* Status Badge */}
          {isComplete ? (
            <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Complete
            </span>
          ) : isSlidesFinished ? (
            <span className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              <BookCheck className="h-3.5 w-3.5" />
              Finished
            </span>
          ) : isStarted ? (
            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
              <Clock className="h-3.5 w-3.5" />
              In Progress
            </span>
          ) : null}
        </div>

        {/* Icon & Title */}
        <div className="mb-3">
          <span className="text-3xl">{chapter.icon}</span>
        </div>

        <h3 className="mb-2 font-serif text-xl font-medium text-foreground">
          {chapter.title}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {chapter.description}
        </p>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{chapter.slides.length} slides</span>
          <span>
            {chapter.quiz.mcq.length +
              chapter.quiz.trueFalse.length +
              chapter.quiz.matching.length +
              chapter.quiz.fillBlank.length}{' '}
            questions
          </span>
        </div>

        {/* Quiz Score (if completed) */}
        {quizScore !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Quiz Score</span>
              <span
                className={cn(
                  'font-medium',
                  quizScore >= 70 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {Math.round(quizScore)}%
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  'h-full transition-all',
                  quizScore >= 70 ? 'bg-green-500' : 'bg-red-500'
                )}
                style={{ width: `${quizScore}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-1 text-sm font-medium text-coral-600 group-hover:text-coral-700">
          <span>{isStarted ? 'Continue' : 'Start'} Chapter</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
