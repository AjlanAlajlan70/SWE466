'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Slide, ContentSlide } from '@/data/chapters/types';

interface UseSlideNavigationProps {
  slides: Slide[];
  initialSlide?: number;
  initialStep?: number;
  onSlideChange?: (slideIndex: number, stepIndex: number) => void;
  onComplete?: () => void;
}

interface UseSlideNavigationReturn {
  currentSlideIndex: number;
  currentStepIndex: number;
  currentSlide: Slide;
  direction: number;
  totalSlides: number;
  totalSteps: number;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  next: () => void;
  prev: () => void;
  goToSlide: (index: number) => void;
}

/**
 * Get the number of steps for a slide
 */
function getSlideSteps(slide: Slide): number {
  if (slide.type === 'content') {
    return (slide as ContentSlide).content.length;
  }
  if (slide.type === 'takeaway') {
    return 4; // 4 takeaway points
  }
  if (slide.type === 'comparison') {
    return 2; // 2 columns
  }
  if (slide.type === 'timeline') {
    return slide.events.length;
  }
  if (slide.type === 'mindmap') {
    return 1 + slide.branches.length;  // 1 for center + number of branches
  }
  return 1; // title, section slides have 1 step
}

/**
 * Hook for managing slide and step navigation
 */
export function useSlideNavigation({
  slides,
  initialSlide = 0,
  initialStep = 0,
  onSlideChange,
  onComplete,
}: UseSlideNavigationProps): UseSlideNavigationReturn {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide);
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStep);
  const [direction, setDirection] = useState(0);

  const currentSlide = slides[currentSlideIndex];
  const totalSlides = slides.length;
  const totalSteps = getSlideSteps(currentSlide);

  const isFirstSlide = currentSlideIndex === 0;
  const isLastSlide = currentSlideIndex === totalSlides - 1;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex >= totalSteps - 1;

  // Calculate overall progress
  const progress = useMemo(() => {
    let completedSteps = 0;
    let totalAllSteps = 0;

    for (let i = 0; i < slides.length; i++) {
      const slideSteps = getSlideSteps(slides[i]);
      totalAllSteps += slideSteps;

      if (i < currentSlideIndex) {
        completedSteps += slideSteps;
      } else if (i === currentSlideIndex) {
        completedSteps += currentStepIndex + 1;
      }
    }

    return (completedSteps / totalAllSteps) * 100;
  }, [slides, currentSlideIndex, currentStepIndex]);

  // Navigate to next step or slide
  const next = useCallback(() => {
    setDirection(1);

    if (!isLastStep) {
      // Move to next step
      setCurrentStepIndex((prev) => prev + 1);
    } else if (!isLastSlide) {
      // Move to next slide
      setCurrentSlideIndex((prev) => prev + 1);
      setCurrentStepIndex(0);
    } else {
      // Completed all slides
      onComplete?.();
    }
  }, [isLastStep, isLastSlide, onComplete]);

  // Navigate to previous step or slide
  const prev = useCallback(() => {
    setDirection(-1);

    if (!isFirstStep) {
      // Move to previous step
      setCurrentStepIndex((prev) => prev - 1);
    } else if (!isFirstSlide) {
      // Move to previous slide
      const prevSlideIndex = currentSlideIndex - 1;
      const prevSlideSteps = getSlideSteps(slides[prevSlideIndex]);
      setCurrentSlideIndex(prevSlideIndex);
      setCurrentStepIndex(prevSlideSteps - 1);
    }
  }, [isFirstStep, isFirstSlide, currentSlideIndex, slides]);

  // Jump to a specific slide
  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setDirection(index > currentSlideIndex ? 1 : -1);
        setCurrentSlideIndex(index);
        setCurrentStepIndex(0);
      }
    },
    [currentSlideIndex, totalSlides]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          next();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prev();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, goToSlide, totalSlides]);

  // Notify parent of slide changes
  useEffect(() => {
    onSlideChange?.(currentSlideIndex, currentStepIndex);
  }, [currentSlideIndex, currentStepIndex, onSlideChange]);

  return {
    currentSlideIndex,
    currentStepIndex,
    currentSlide,
    direction,
    totalSlides,
    totalSteps,
    isFirstSlide,
    isLastSlide,
    isFirstStep,
    isLastStep,
    progress,
    next,
    prev,
    goToSlide,
  };
}
