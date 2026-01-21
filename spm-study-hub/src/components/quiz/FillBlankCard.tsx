'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { FillBlankQuestion } from '@/data/chapters/types';
import { cn } from '@/lib/utils';
import { stepVariants } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

interface FillBlankCardProps {
  question: FillBlankQuestion;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
  showResult?: boolean;
  isCorrect?: boolean | null;
}

export function FillBlankCard({
  question,
  onSubmit,
  disabled = false,
  showResult = false,
  isCorrect = null,
}: FillBlankCardProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !disabled) {
      onSubmit(answer.trim());
    }
  };

  // Split question text around the blank
  const parts = question.question.split('___');

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Question with Blank */}
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <p className="text-lg text-foreground leading-relaxed">
          {parts[0]}
          <span
            className={cn(
              'inline-block min-w-[120px] mx-1 border-b-2 px-2 py-1',
              !showResult && 'border-coral-400',
              showResult && isCorrect && 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
              showResult && !isCorrect && 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
            )}
          >
            {showResult ? (
              <span className="flex items-center gap-1">
                {answer}
                {isCorrect ? (
                  <Check className="h-4 w-4 text-green-600 inline" />
                ) : (
                  <X className="h-4 w-4 text-red-600 inline" />
                )}
              </span>
            ) : (
              answer || '\u00A0'
            )}
          </span>
          {parts[1]}
        </p>
      </div>

      {/* Input Form */}
      {!showResult && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-muted-foreground mb-2"
            >
              Your Answer
            </label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={disabled}
              placeholder="Type your answer..."
              className={cn(
                'w-full rounded-lg border border-border bg-background px-4 py-3',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring',
                'transition-colors',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              autoComplete="off"
              autoFocus
            />
          </div>

          <Button
            type="submit"
            disabled={!answer.trim() || disabled}
            className="w-full"
          >
            Submit Answer
          </Button>
        </form>
      )}

      {/* Show correct answer if wrong */}
      {showResult && !isCorrect && (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-4">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>Correct answer:</strong> {question.acceptableAnswers[0]}
          </p>
        </div>
      )}
    </motion.div>
  );
}
