'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Trophy, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Chapter, ChapterProgress } from '@/data/chapters/types';

interface QuizCardProps {
  chapter: Chapter;
  progress?: ChapterProgress;
  index: number;
}

export function QuizCard({ chapter, progress, index }: QuizCardProps) {
  const hasCompletedQuiz = progress?.quizScore !== undefined;
  const quizScore = progress?.quizScore;
  const slidesCompleted = progress?.slidesCompleted ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/chapter/${chapter.slug}/quiz`}>
        <div
          className={cn(
            'group relative overflow-hidden rounded-xl border border-border bg-card p-5',
            'transition-all duration-300 hover:border-teal-300 hover:shadow-lg hover:-translate-y-1',
            hasCompletedQuiz && 'border-teal-200 bg-teal-50/30'
          )}
        >
          {/* Quiz Icon */}
          <div className={cn(
            'mb-4 flex h-12 w-12 items-center justify-center rounded-xl',
            hasCompletedQuiz
              ? 'bg-teal-100 text-teal-600'
              : 'bg-coral-100 text-coral-600'
          )}>
            <Brain className="h-6 w-6" />
          </div>

          {/* Chapter Info */}
          <div className="mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              Chapter {chapter.chapterNumber} Quiz
            </span>
            <h3 className="mt-1 font-semibold text-foreground group-hover:text-teal-600 transition-colors">
              {chapter.title}
            </h3>
          </div>

          {/* Quiz Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {chapter.quiz.mcq.length + chapter.quiz.trueFalse.length +
               chapter.quiz.matching.length + chapter.quiz.fillBlank.length} questions
            </span>
          </div>

          {/* Status Badge */}
          {hasCompletedQuiz && quizScore ? (
            <div className="mt-4 flex items-center justify-between rounded-lg bg-teal-100/50 px-3 py-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-teal-700">
                  Best: {Math.round(quizScore.percentage)}%
                </span>
              </div>
              <CheckCircle className="h-4 w-4 text-teal-600" />
            </div>
          ) : slidesCompleted ? (
            <div className="mt-4 rounded-lg bg-coral-50 px-3 py-2">
              <span className="text-sm font-medium text-coral-600">
                Ready to take quiz
              </span>
            </div>
          ) : (
            <div className="mt-4 rounded-lg bg-muted px-3 py-2">
              <span className="text-sm text-muted-foreground">
                Complete slides first
              </span>
            </div>
          )}

          {/* Hover Gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-500/5 to-coral-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
    </motion.div>
  );
}
