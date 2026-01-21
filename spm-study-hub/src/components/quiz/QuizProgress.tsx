'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { progressBar } from '@/lib/animations';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

export function QuizProgress({
  currentQuestion,
  totalQuestions,
  className,
}: QuizProgressProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      {/* Question Counter */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question{' '}
          <span className="font-medium text-foreground">
            {currentQuestion + 1}
          </span>{' '}
          of {totalQuestions}
        </span>
        <span className="font-medium text-foreground">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          variants={progressBar}
          initial="initial"
          animate="animate"
          custom={progress}
          className="h-full bg-gradient-to-r from-coral-500 to-teal-500"
        />
      </div>
    </div>
  );
}
