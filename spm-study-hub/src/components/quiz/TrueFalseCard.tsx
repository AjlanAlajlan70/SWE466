'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { TrueFalseQuestion } from '@/data/chapters/types';
import { cn } from '@/lib/utils';
import { stepVariants } from '@/lib/animations';

interface TrueFalseCardProps {
  question: TrueFalseQuestion;
  onSubmit: (selected: boolean) => void;
  disabled?: boolean;
  showResult?: boolean;
  isCorrect?: boolean | null;
}

export function TrueFalseCard({
  question,
  onSubmit,
  disabled = false,
  showResult = false,
  isCorrect = null,
}: TrueFalseCardProps) {
  const [selected, setSelected] = useState<boolean | null>(null);

  const handleSelect = (value: boolean) => {
    if (disabled || showResult) return;
    setSelected(value);
    onSubmit(value);
  };

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Statement */}
      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <p className="text-lg text-foreground">
          {question.statement}
        </p>
      </div>

      {/* True/False Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* True Button */}
        <button
          onClick={() => handleSelect(true)}
          disabled={disabled || showResult}
          className={cn(
            'flex items-center justify-center gap-2 rounded-xl border p-6 font-medium transition-all',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            !showResult && selected !== true && 'border-border hover:border-green-400 hover:bg-green-50',
            !showResult && selected === true && 'border-green-500 bg-green-100',
            showResult && question.isTrue && 'border-green-500 bg-green-100',
            showResult && !question.isTrue && selected === true && 'border-red-500 bg-red-100',
            showResult && !question.isTrue && selected !== true && 'border-border opacity-50'
          )}
        >
          {showResult && question.isTrue ? (
            <Check className="h-5 w-5 text-green-600" />
          ) : showResult && selected === true && !question.isTrue ? (
            <X className="h-5 w-5 text-red-600" />
          ) : null}
          <span className={cn(
            showResult && question.isTrue && 'text-green-700',
            showResult && !question.isTrue && selected === true && 'text-red-700',
            !showResult && 'text-foreground'
          )}>
            True
          </span>
        </button>

        {/* False Button */}
        <button
          onClick={() => handleSelect(false)}
          disabled={disabled || showResult}
          className={cn(
            'flex items-center justify-center gap-2 rounded-xl border p-6 font-medium transition-all',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            !showResult && selected !== false && 'border-border hover:border-red-400 hover:bg-red-50',
            !showResult && selected === false && 'border-red-500 bg-red-100',
            showResult && !question.isTrue && 'border-green-500 bg-green-100',
            showResult && question.isTrue && selected === false && 'border-red-500 bg-red-100',
            showResult && question.isTrue && selected !== false && 'border-border opacity-50'
          )}
        >
          {showResult && !question.isTrue ? (
            <Check className="h-5 w-5 text-green-600" />
          ) : showResult && selected === false && question.isTrue ? (
            <X className="h-5 w-5 text-red-600" />
          ) : null}
          <span className={cn(
            showResult && !question.isTrue && 'text-green-700',
            showResult && question.isTrue && selected === false && 'text-red-700',
            !showResult && 'text-foreground'
          )}>
            False
          </span>
        </button>
      </div>
    </motion.div>
  );
}
