'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scaleIn } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

interface ExplanationModalProps {
  isCorrect: boolean;
  explanation: string;
  onContinue: () => void;
}

export function ExplanationModal({
  isCorrect,
  explanation,
  onContinue,
}: ExplanationModalProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className={cn(
        'mt-6 rounded-xl border p-6',
        isCorrect
          ? 'border-green-200 bg-green-50'
          : 'border-red-200 bg-red-50'
      )}
    >
      {/* Result Header */}
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? (
          <>
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <span className="text-lg font-semibold text-green-800">
              Correct!
            </span>
          </>
        ) : (
          <>
            <XCircle className="h-6 w-6 text-red-600" />
            <span className="text-lg font-semibold text-red-800">
              Incorrect
            </span>
          </>
        )}
      </div>

      {/* Explanation */}
      <div className="flex items-start gap-3 mb-6">
        <Lightbulb className={cn(
          'h-5 w-5 mt-0.5 flex-shrink-0',
          isCorrect ? 'text-green-600' : 'text-red-600'
        )} />
        <p className={cn(
          'text-sm',
          isCorrect ? 'text-green-800' : 'text-red-800'
        )}>
          {explanation}
        </p>
      </div>

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        variant={isCorrect ? 'secondary' : 'primary'}
        rightIcon={<ArrowRight className="h-4 w-4" />}
        className="w-full"
      >
        Continue
      </Button>
    </motion.div>
  );
}
