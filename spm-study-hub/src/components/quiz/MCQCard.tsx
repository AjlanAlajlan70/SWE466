'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { MCQQuestion } from '@/data/chapters/types';
import { cn } from '@/lib/utils';
import { stepVariants } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

interface MCQCardProps {
  question: MCQQuestion;
  onSubmit: (selectedIndex: number) => void;
  disabled?: boolean;
  showResult?: boolean;
  isCorrect?: boolean | null;
}

const optionLabels = ['A', 'B', 'C', 'D'];

export function MCQCard({
  question,
  onSubmit,
  disabled = false,
  showResult = false,
  isCorrect = null,
}: MCQCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (disabled || showResult) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex !== null && !disabled) {
      onSubmit(selectedIndex);
    }
  };

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Question */}
      <h3 className="text-lg font-medium text-foreground">
        {question.question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrectOption = index === question.correctIndex;
          const showCorrectness = showResult;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={disabled || showResult}
              className={cn(
                'w-full rounded-xl border p-4 text-left transition-all',
                'flex items-start gap-3',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                !showCorrectness && !isSelected && 'border-border hover:border-coral-300 hover:bg-coral-50/50 dark:hover:bg-coral-900/20',
                !showCorrectness && isSelected && 'border-coral-500 bg-coral-50 dark:bg-coral-900/20',
                showCorrectness && isCorrectOption && 'border-green-500 bg-green-50 dark:bg-green-900/20',
                showCorrectness && isSelected && !isCorrectOption && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                showCorrectness && !isCorrectOption && !isSelected && 'border-border opacity-50'
              )}
            >
              {/* Option Label */}
              <span
                className={cn(
                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-medium',
                  !showCorrectness && !isSelected && 'bg-muted text-muted-foreground',
                  !showCorrectness && isSelected && 'bg-coral-500 text-white',
                  showCorrectness && isCorrectOption && 'bg-green-500 text-white',
                  showCorrectness && isSelected && !isCorrectOption && 'bg-red-500 text-white',
                  showCorrectness && !isCorrectOption && !isSelected && 'bg-muted text-muted-foreground'
                )}
              >
                {showCorrectness && isCorrectOption ? (
                  <Check className="h-4 w-4" />
                ) : showCorrectness && isSelected && !isCorrectOption ? (
                  <X className="h-4 w-4" />
                ) : (
                  optionLabels[index]
                )}
              </span>

              {/* Option Text */}
              <span className={cn(
                'pt-1',
                showCorrectness && isCorrectOption && 'text-green-800 dark:text-green-300',
                showCorrectness && isSelected && !isCorrectOption && 'text-red-800 dark:text-red-300',
                !showCorrectness && 'text-foreground'
              )}>
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={selectedIndex === null || disabled}
          className="w-full"
        >
          Submit Answer
        </Button>
      )}
    </motion.div>
  );
}
