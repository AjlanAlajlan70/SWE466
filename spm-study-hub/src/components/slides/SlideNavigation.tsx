'use client';

import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface SlideNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  onStartQuiz?: () => void;
  onMarkFinish?: () => void;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  isLastStep: boolean;
  isCompleted?: boolean;
  currentSlide: number;
  totalSlides: number;
  className?: string;
}

export function SlideNavigation({
  onPrev,
  onNext,
  onStartQuiz,
  onMarkFinish,
  isFirstSlide,
  isLastSlide,
  isLastStep,
  isCompleted = false,
  currentSlide,
  totalSlides,
  className,
}: SlideNavigationProps) {
  const showFinishOptions = isLastSlide && isLastStep;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        className
      )}
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={isFirstSlide}
        leftIcon={<ChevronLeft className="h-4 w-4" />}
      >
        Previous
      </Button>

      {/* Slide Counter */}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{currentSlide + 1}</span>
        {' / '}
        {totalSlides}
      </div>

      {/* Next Button / Finish Options */}
      {showFinishOptions ? (
        <div className="flex items-center gap-2">
          {onMarkFinish && (
            isCompleted ? (
              <Button
                variant="outline"
                disabled
                className="border-green-500 bg-green-50 text-green-700 hover:bg-green-50"
                rightIcon={<Check className="h-4 w-4" />}
              >
                Completed
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={onMarkFinish}
                rightIcon={<CheckCircle className="h-4 w-4" />}
              >
                Mark Finish
              </Button>
            )
          )}
          {onStartQuiz && (
            <Button
              variant="primary"
              onClick={onStartQuiz}
              rightIcon={<PlayCircle className="h-4 w-4" />}
            >
              Take Quiz
            </Button>
          )}
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={onNext}
          rightIcon={<ChevronRight className="h-4 w-4" />}
        >
          Next
        </Button>
      )}
    </div>
  );
}
