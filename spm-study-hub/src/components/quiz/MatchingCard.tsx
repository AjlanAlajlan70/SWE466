'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Link2 } from 'lucide-react';
import { MatchingQuestion, MatchingPair } from '@/data/chapters/types';
import { cn, shuffleArray } from '@/lib/utils';
import { stepVariants } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

interface MatchingCardProps {
  question: MatchingQuestion;
  onSubmit: (pairs: MatchingPair[]) => void;
  disabled?: boolean;
  showResult?: boolean;
  isCorrect?: boolean | null;
}

export function MatchingCard({
  question,
  onSubmit,
  disabled = false,
  showResult = false,
  isCorrect = null,
}: MatchingCardProps) {
  // Shuffle the right column items
  const [shuffledRight] = useState(() =>
    shuffleArray(question.pairs.map(p => p.right))
  );

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Map<string, string>>(new Map());

  const handleLeftClick = useCallback((left: string) => {
    if (disabled || showResult) return;
    setSelectedLeft(selectedLeft === left ? null : left);
  }, [disabled, showResult, selectedLeft]);

  const handleRightClick = useCallback((right: string) => {
    if (disabled || showResult || !selectedLeft) return;

    // Check if this right item is already matched
    const existingLeftForRight = Array.from(matches.entries())
      .find(([_, r]) => r === right)?.[0];

    if (existingLeftForRight) {
      // Remove existing match
      setMatches(prev => {
        const newMatches = new Map(prev);
        newMatches.delete(existingLeftForRight);
        newMatches.set(selectedLeft, right);
        return newMatches;
      });
    } else {
      // Add new match
      setMatches(prev => {
        const newMatches = new Map(prev);
        newMatches.set(selectedLeft, right);
        return newMatches;
      });
    }

    setSelectedLeft(null);
  }, [disabled, showResult, selectedLeft, matches]);

  const handleRemoveMatch = useCallback((left: string) => {
    if (disabled || showResult) return;
    setMatches(prev => {
      const newMatches = new Map(prev);
      newMatches.delete(left);
      return newMatches;
    });
  }, [disabled, showResult]);

  const handleSubmit = useCallback(() => {
    if (matches.size !== question.pairs.length) return;

    const userPairs: MatchingPair[] = Array.from(matches.entries()).map(
      ([left, right]) => ({ left, right })
    );
    onSubmit(userPairs);
  }, [matches, question.pairs.length, onSubmit]);

  // Check if a specific match is correct
  const isMatchCorrect = (left: string, right: string) => {
    return question.pairs.some(p => p.left === left && p.right === right);
  };

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Instruction */}
      <p className="text-lg font-medium text-foreground">
        {question.instruction}
      </p>

      {/* Matching Grid */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground mb-2">Terms</p>
          {question.pairs.map((pair, index) => {
            const isSelected = selectedLeft === pair.left;
            const matchedRight = matches.get(pair.left);
            const hasMatch = matchedRight !== undefined;
            const matchIsCorrect = hasMatch && isMatchCorrect(pair.left, matchedRight);

            return (
              <button
                key={index}
                onClick={() => hasMatch ? handleRemoveMatch(pair.left) : handleLeftClick(pair.left)}
                disabled={disabled || showResult}
                className={cn(
                  'w-full rounded-lg border p-3 text-left transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  !showResult && !isSelected && !hasMatch && 'border-border hover:border-coral-300',
                  !showResult && isSelected && 'border-coral-500 bg-coral-50 ring-2 ring-coral-500',
                  !showResult && hasMatch && 'border-teal-500 bg-teal-50',
                  showResult && hasMatch && matchIsCorrect && 'border-green-500 bg-green-50',
                  showResult && hasMatch && !matchIsCorrect && 'border-red-500 bg-red-50',
                  showResult && !hasMatch && 'border-border opacity-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'text-sm',
                    showResult && hasMatch && matchIsCorrect && 'text-green-800',
                    showResult && hasMatch && !matchIsCorrect && 'text-red-800',
                    !showResult && 'text-foreground'
                  )}>
                    {pair.left}
                  </span>
                  {hasMatch && (
                    <span className="flex items-center gap-1">
                      {showResult ? (
                        matchIsCorrect ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )
                      ) : (
                        <Link2 className="h-4 w-4 text-teal-600" />
                      )}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground mb-2">Definitions</p>
          {shuffledRight.map((right, index) => {
            const matchedLeft = Array.from(matches.entries())
              .find(([_, r]) => r === right)?.[0];
            const hasMatch = matchedLeft !== undefined;
            const matchIsCorrect = hasMatch && isMatchCorrect(matchedLeft, right);

            return (
              <button
                key={index}
                onClick={() => handleRightClick(right)}
                disabled={disabled || showResult || !selectedLeft}
                className={cn(
                  'w-full rounded-lg border p-3 text-left transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  !showResult && !hasMatch && !selectedLeft && 'border-border',
                  !showResult && !hasMatch && selectedLeft && 'border-border hover:border-teal-300 cursor-pointer',
                  !showResult && hasMatch && 'border-teal-500 bg-teal-50',
                  showResult && hasMatch && matchIsCorrect && 'border-green-500 bg-green-50',
                  showResult && hasMatch && !matchIsCorrect && 'border-red-500 bg-red-50',
                  showResult && !hasMatch && 'border-border opacity-50'
                )}
              >
                <span className={cn(
                  'text-sm',
                  showResult && hasMatch && matchIsCorrect && 'text-green-800',
                  showResult && hasMatch && !matchIsCorrect && 'text-red-800',
                  !showResult && 'text-foreground'
                )}>
                  {right}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Matched Pairs Summary */}
      {matches.size > 0 && !showResult && (
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Your Matches ({matches.size}/{question.pairs.length})
          </p>
          <div className="space-y-1">
            {Array.from(matches.entries()).map(([left, right]) => (
              <p key={left} className="text-sm text-foreground">
                {left} → {right}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!showResult && (
        <Button
          onClick={handleSubmit}
          disabled={matches.size !== question.pairs.length || disabled}
          className="w-full"
        >
          Submit Matches
        </Button>
      )}
    </motion.div>
  );
}
