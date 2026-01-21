'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter, MCQQuestion, TrueFalseQuestion, MatchingQuestion, FillBlankQuestion, QuizScore } from '@/data/chapters/types';
import { useQuizState } from '@/hooks/useQuizState';
import { useProgress } from '@/hooks/useProgress';
import { cn } from '@/lib/utils';
import { slideVariants } from '@/lib/animations';
import { Send } from 'lucide-react';
import { MCQCard } from './MCQCard';
import { TrueFalseCard } from './TrueFalseCard';
import { MatchingCard } from './MatchingCard';
import { FillBlankCard } from './FillBlankCard';
import { QuizProgress } from './QuizProgress';
import { QuizResults } from './QuizResults';
import { ExplanationModal } from './ExplanationModal';
import { Button } from '@/components/ui/Button';

interface QuizContainerProps {
  chapter: Chapter;
}

type QuizType = 'mcq' | 'trueFalse' | 'matching' | 'fillBlank';

const quizTypeLabels: Record<QuizType, string> = {
  mcq: 'Multiple Choice',
  trueFalse: 'True/False',
  matching: 'Matching',
  fillBlank: 'Fill Blank',
};

export function QuizContainer({ chapter }: QuizContainerProps) {
  const router = useRouter();
  const { saveQuizScore } = useProgress();

  const handleComplete = useCallback(
    (score: QuizScore) => {
      saveQuizScore(chapter.id, score);
    },
    [chapter.id, saveQuizScore]
  );

  const {
    currentType,
    currentQuestion,
    currentQuestionIndex,
    totalQuestionsForType,
    showExplanation,
    lastAnswerCorrect,
    isQuizComplete,
    score,
    answers,
    submitAnswer,
    submitQuiz,
    nextQuestion,
    changeQuizType,
    reset,
    getTypeProgress,
    totalAnswered,
    totalQuestions,
  } = useQuizState({
    quiz: chapter.quiz,
    onComplete: handleComplete,
  });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  // Get current question's explanation
  const getExplanation = () => {
    if (!currentQuestion) return '';
    return currentQuestion.explanation;
  };

  // Render quiz results
  if (isQuizComplete && score) {
    return (
      <div className="min-h-screen px-4 py-8 md:px-8">
        <QuizResults
          score={score}
          quiz={chapter.quiz}
          answers={answers}
          onRetry={reset}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Get available quiz types (those with questions)
  const availableTypes = (['mcq', 'trueFalse', 'matching', 'fillBlank'] as QuizType[]).filter(
    (type) => {
      switch (type) {
        case 'mcq':
          return chapter.quiz.mcq.length > 0;
        case 'trueFalse':
          return chapter.quiz.trueFalse.length > 0;
        case 'matching':
          return chapter.quiz.matching.length > 0;
        case 'fillBlank':
          return chapter.quiz.fillBlank.length > 0;
      }
    }
  );

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-sm font-medium text-muted-foreground">
            Chapter {chapter.chapterNumber} Quiz
          </span>
          <h1 className="mt-2 font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {chapter.title}
          </h1>
        </div>

        {/* Quiz Type Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {availableTypes.map((type) => {
            const progress = getTypeProgress(type);
            const isActive = currentType === type;
            const isComplete = progress.answered === progress.total;

            return (
              <button
                key={type}
                onClick={() => changeQuizType(type)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  isActive
                    ? 'bg-coral-500 text-white'
                    : isComplete
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {quizTypeLabels[type]}
                <span className="ml-2 text-xs opacity-75">
                  ({progress.answered}/{progress.total})
                </span>
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <QuizProgress
          currentQuestion={currentQuestionIndex}
          totalQuestions={totalQuestionsForType}
          className="mb-8"
        />

        {/* Question Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentType}-${currentQuestionIndex}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
            >
              {/* Render appropriate question type */}
              {currentType === 'mcq' && currentQuestion && (
                <MCQCard
                  question={currentQuestion as MCQQuestion}
                  onSubmit={submitAnswer}
                  showResult={showExplanation}
                  isCorrect={lastAnswerCorrect}
                />
              )}

              {currentType === 'trueFalse' && currentQuestion && (
                <TrueFalseCard
                  question={currentQuestion as TrueFalseQuestion}
                  onSubmit={submitAnswer}
                  showResult={showExplanation}
                  isCorrect={lastAnswerCorrect}
                />
              )}

              {currentType === 'matching' && currentQuestion && (
                <MatchingCard
                  question={currentQuestion as MatchingQuestion}
                  onSubmit={submitAnswer}
                  showResult={showExplanation}
                  isCorrect={lastAnswerCorrect}
                />
              )}

              {currentType === 'fillBlank' && currentQuestion && (
                <FillBlankCard
                  question={currentQuestion as FillBlankQuestion}
                  onSubmit={submitAnswer}
                  showResult={showExplanation}
                  isCorrect={lastAnswerCorrect}
                />
              )}

              {/* Explanation */}
              {showExplanation && lastAnswerCorrect !== null && (
                <ExplanationModal
                  isCorrect={lastAnswerCorrect}
                  explanation={getExplanation()}
                  onContinue={nextQuestion}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Submit Quiz Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Answered {totalAnswered} of {totalQuestions} questions
          </p>
          <Button
            variant="primary"
            onClick={submitQuiz}
            leftIcon={<Send className="h-4 w-4" />}
            className="px-8"
          >
            Submit Quiz
          </Button>
          {totalAnswered < totalQuestions && (
            <p className="text-xs text-muted-foreground">
              Unanswered questions will be marked as incorrect
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
