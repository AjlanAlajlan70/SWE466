'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ChapterProgress, QuizScore, UserProgress } from '@/data/chapters/types';

const PROGRESS_KEY = 'spm-study-hub-progress';

const initialProgress: UserProgress = {
  chapters: {},
};

/**
 * Hook for managing user progress across chapters
 */
export function useProgress() {
  const [progress, setProgress, , isLoaded] = useLocalStorage<UserProgress>(
    PROGRESS_KEY,
    initialProgress
  );

  // Get progress for a specific chapter
  const getChapterProgress = useCallback(
    (chapterId: string): ChapterProgress | undefined => {
      return progress.chapters[chapterId];
    },
    [progress]
  );

  // Update slide progress for a chapter
  const updateSlideProgress = useCallback(
    (chapterId: string, slideIndex: number, stepIndex: number) => {
      setProgress((prev) => {
        const existingProgress = prev.chapters[chapterId];
        return {
          ...prev,
          chapters: {
            ...prev.chapters,
            [chapterId]: {
              chapterId,
              slidesCompleted: existingProgress?.slidesCompleted || false,
              currentSlide: slideIndex,
              currentStep: stepIndex,
              quizScore: existingProgress?.quizScore,
              lastAccessedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    [setProgress]
  );

  // Mark slides as completed for a chapter
  const markSlidesComplete = useCallback(
    (chapterId: string) => {
      setProgress((prev) => {
        const existingProgress = prev.chapters[chapterId];
        return {
          ...prev,
          chapters: {
            ...prev.chapters,
            [chapterId]: {
              chapterId,
              slidesCompleted: true,
              currentSlide: existingProgress?.currentSlide || 0,
              currentStep: existingProgress?.currentStep || 0,
              quizScore: existingProgress?.quizScore,
              lastAccessedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    [setProgress]
  );

  // Save quiz score for a chapter (only if higher than existing score)
  const saveQuizScore = useCallback(
    (chapterId: string, score: QuizScore) => {
      setProgress((prev) => {
        const existingProgress = prev.chapters[chapterId];
        const existingScore = existingProgress?.quizScore;

        // Only save if no existing score or new score is higher
        const shouldUpdate = !existingScore || score.percentage > existingScore.percentage;

        return {
          ...prev,
          chapters: {
            ...prev.chapters,
            [chapterId]: {
              chapterId,
              slidesCompleted: existingProgress?.slidesCompleted || true,
              currentSlide: existingProgress?.currentSlide || 0,
              currentStep: existingProgress?.currentStep || 0,
              quizScore: shouldUpdate ? score : existingScore,
              lastAccessedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    [setProgress]
  );

  // Reset progress for a chapter
  const resetChapterProgress = useCallback(
    (chapterId: string) => {
      setProgress((prev) => {
        const { [chapterId]: _, ...rest } = prev.chapters;
        return {
          ...prev,
          chapters: rest,
        };
      });
    },
    [setProgress]
  );

  // Reset all progress
  const resetAllProgress = useCallback(() => {
    setProgress(initialProgress);
  }, [setProgress]);

  // Calculate overall progress percentage
  const overallProgress = useMemo(() => {
    const chapters = Object.values(progress.chapters);
    if (chapters.length === 0) return 0;

    const completedChapters = chapters.filter(
      (ch) => ch.slidesCompleted && ch.quizScore
    ).length;

    return (completedChapters / chapters.length) * 100;
  }, [progress]);

  return {
    progress,
    isLoaded,
    getChapterProgress,
    updateSlideProgress,
    markSlidesComplete,
    saveQuizScore,
    resetChapterProgress,
    resetAllProgress,
    overallProgress,
  };
}
