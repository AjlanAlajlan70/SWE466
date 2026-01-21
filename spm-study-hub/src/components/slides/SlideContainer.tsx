'use client';

import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from '@/data/chapters/types';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import { useProgress } from '@/hooks/useProgress';
import { slideVariants } from '@/lib/animations';
import { SlideRenderer } from './SlideRenderer';
import { SlideNavigation } from './SlideNavigation';
import { ProgressBar } from './ProgressBar';
import { StepIndicator } from './StepIndicator';
import { SlideMiniNavigator } from './SlideMiniNavigator';

interface SlideContainerProps {
  chapter: Chapter;
  isAISidebarOpen?: boolean;
}

export function SlideContainer({ chapter, isAISidebarOpen = false }: SlideContainerProps) {
  const router = useRouter();
  const { updateSlideProgress, markSlidesComplete, getChapterProgress } = useProgress();
  const [isMarkedComplete, setIsMarkedComplete] = useState(false);

  // Sync isMarkedComplete when progress loads from localStorage
  useEffect(() => {
    const chapterProgress = getChapterProgress(chapter.id);
    if (chapterProgress?.slidesCompleted) {
      setIsMarkedComplete(true);
    }
  }, [chapter.id, getChapterProgress]);

  // Handle slide change - save progress
  const handleSlideChange = useCallback(
    (slideIndex: number, stepIndex: number) => {
      updateSlideProgress(chapter.id, slideIndex, stepIndex);
    },
    [chapter.id, updateSlideProgress]
  );

  // Handle completion - mark slides as complete
  const handleComplete = useCallback(() => {
    markSlidesComplete(chapter.id);
  }, [chapter.id, markSlidesComplete]);

  const {
    currentSlideIndex,
    currentStepIndex,
    currentSlide,
    direction,
    totalSlides,
    totalSteps,
    isFirstSlide,
    isLastSlide,
    isLastStep,
    progress,
    next,
    prev,
    goToSlide,
  } = useSlideNavigation({
    slides: chapter.slides,
    onSlideChange: handleSlideChange,
    onComplete: handleComplete,
  });

  // Navigate to quiz
  const handleStartQuiz = () => {
    markSlidesComplete(chapter.id);
    setIsMarkedComplete(true);
    window.location.href = `/chapter/${chapter.slug}/quiz`;
  };

  // Mark as finished without navigating
  const handleMarkFinish = () => {
    markSlidesComplete(chapter.id);
    setIsMarkedComplete(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Progress Bar */}
      <ProgressBar progress={progress} className="fixed left-0 right-0 top-0 z-40" />

      {/* Main Content */}
      <main className="flex flex-1 flex-col px-4 pb-24 pt-8 md:px-8">
        {/* Chapter Title */}
        <div className="mb-4 text-center">
          <span className="text-sm font-medium text-muted-foreground">
            Chapter {chapter.chapterNumber}
          </span>
        </div>

        {/* Slide Content */}
        <div className="flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlideIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <SlideRenderer
                slide={currentSlide}
                visibleSteps={currentStepIndex + 1}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step Indicator */}
        <div className="mt-8 flex justify-center">
          <StepIndicator
            totalSteps={totalSteps}
            currentStep={currentStepIndex}
          />
        </div>
      </main>

      {/* Slide Mini Navigator */}
      <SlideMiniNavigator
        slides={chapter.slides}
        currentSlideIndex={currentSlideIndex}
        onGoToSlide={goToSlide}
      />

      {/* Navigation */}
      <div
        className="fixed bottom-0 left-0 z-50 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-sm transition-all duration-300 md:px-8"
        style={{ right: isAISidebarOpen ? '400px' : '0' }}
      >
        <div className="mx-auto max-w-4xl">
          <SlideNavigation
            onPrev={prev}
            onNext={next}
            onStartQuiz={handleStartQuiz}
            onMarkFinish={handleMarkFinish}
            isFirstSlide={isFirstSlide}
            isLastSlide={isLastSlide}
            isLastStep={isLastStep}
            isCompleted={isMarkedComplete}
            currentSlide={currentSlideIndex}
            totalSlides={totalSlides}
          />
        </div>
      </div>
    </div>
  );
}
