'use client';

import { motion } from 'framer-motion';
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { QuizScore, Quiz, MCQQuestion, TrueFalseQuestion, MatchingQuestion, FillBlankQuestion } from '@/data/chapters/types';
import { cn, getGrade } from '@/lib/utils';
import { staggerContainer, stepVariants } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

interface QuizAnswer {
  questionId: string;
  isCorrect: boolean;
  userAnswer: unknown;
}

interface QuizResultsProps {
  score: QuizScore;
  quiz: Quiz;
  answers: Record<string, QuizAnswer>;
  onRetry: () => void;
  onBack: () => void;
}

export function QuizResults({
  score,
  quiz,
  answers,
  onRetry,
  onBack,
}: QuizResultsProps) {
  const { grade, color } = getGrade(score.percentage);
  const passed = score.percentage >= 70;
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    mcq: true,
    trueFalse: true,
    matching: true,
    fillBlank: true,
  });

  const totalQuestions = quiz.mcq.length + quiz.trueFalse.length + quiz.matching.length + quiz.fillBlank.length;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = [
    { name: 'Multiple Choice', key: 'mcq', correct: score.mcq, total: quiz.mcq.length },
    { name: 'True/False', key: 'trueFalse', correct: score.trueFalse, total: quiz.trueFalse.length },
    { name: 'Matching', key: 'matching', correct: score.matching, total: quiz.matching.length },
    { name: 'Fill in the Blank', key: 'fillBlank', correct: score.fillBlank, total: quiz.fillBlank.length },
  ].filter(cat => cat.total > 0);

  // Render MCQ question review
  const renderMCQReview = (question: MCQQuestion, index: number) => {
    const answer = answers[question.id];
    const isCorrect = answer?.isCorrect ?? false;
    const userAnswerIndex = answer?.userAnswer as number | null;
    const wasNotAnswered = userAnswerIndex === null || userAnswerIndex === undefined;

    return (
      <div key={question.id} className={cn(
        "p-4 rounded-lg border",
        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      )}>
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="font-medium text-foreground mb-2">
              {index + 1}. {question.question}
              {wasNotAnswered && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                  Not Answered
                </span>
              )}
            </p>
            <div className="space-y-1 text-sm">
              {question.options.map((option, optIndex) => {
                const isUserAnswer = optIndex === userAnswerIndex;
                const isCorrectAnswer = optIndex === question.correctIndex;

                return (
                  <div
                    key={optIndex}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1 rounded",
                      isCorrectAnswer && "bg-green-100 text-green-800 font-medium",
                      isUserAnswer && !isCorrectAnswer && "bg-red-100 text-red-800 line-through"
                    )}
                  >
                    <span className="font-mono">{String.fromCharCode(65 + optIndex)}.</span>
                    <span>{option}</span>
                    {isCorrectAnswer && <CheckCircle2 className="h-4 w-4 ml-auto" />}
                    {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 ml-auto" />}
                  </div>
                );
              })}
            </div>
            {!isCorrect && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Explanation:</span> {question.explanation}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render True/False question review
  const renderTrueFalseReview = (question: TrueFalseQuestion, index: number) => {
    const answer = answers[question.id];
    const isCorrect = answer?.isCorrect ?? false;
    const userAnswer = answer?.userAnswer as boolean | null;
    const wasNotAnswered = userAnswer === null || userAnswer === undefined;

    return (
      <div key={question.id} className={cn(
        "p-4 rounded-lg border",
        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      )}>
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="font-medium text-foreground mb-2">
              {index + 1}. {question.statement}
              {wasNotAnswered && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                  Not Answered
                </span>
              )}
            </p>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Your answer:</span>{' '}
                <span className={cn(
                  "font-medium",
                  isCorrect ? "text-green-600" : "text-red-600"
                )}>
                  {wasNotAnswered ? 'No answer' : (userAnswer ? 'True' : 'False')}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  <span className="text-muted-foreground">Correct answer:</span>{' '}
                  <span className="font-medium text-green-600">
                    {question.isTrue ? 'True' : 'False'}
                  </span>
                </p>
              )}
            </div>
            {!isCorrect && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Explanation:</span> {question.explanation}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Matching question review
  const renderMatchingReview = (question: MatchingQuestion, index: number) => {
    const answer = answers[question.id];
    const isCorrect = answer?.isCorrect ?? false;
    const userPairs = answer?.userAnswer as Array<{ left: string; right: string }> || [];
    const wasNotAnswered = !userPairs || userPairs.length === 0;

    return (
      <div key={question.id} className={cn(
        "p-4 rounded-lg border",
        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      )}>
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="font-medium text-foreground mb-2">
              {index + 1}. {question.instruction}
              {wasNotAnswered && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                  Not Answered
                </span>
              )}
            </p>
            <div className="text-sm space-y-2">
              {wasNotAnswered ? (
                <p className="text-muted-foreground italic">No matches provided</p>
              ) : (
                <>
                  <p className="text-muted-foreground font-medium">Your matches:</p>
                  <div className="grid gap-1">
                    {userPairs.map((pair, pairIndex) => {
                      const isMatchCorrect = question.pairs.some(
                        cp => cp.left === pair.left && cp.right === pair.right
                      );
                      return (
                        <div
                          key={pairIndex}
                          className={cn(
                            "flex items-center gap-2 px-2 py-1 rounded text-sm",
                            isMatchCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          )}
                        >
                          <span>{pair.left}</span>
                          <span className="text-muted-foreground">→</span>
                          <span>{pair.right}</span>
                          {isMatchCorrect ? (
                            <CheckCircle2 className="h-4 w-4 ml-auto" />
                          ) : (
                            <XCircle className="h-4 w-4 ml-auto" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {!isCorrect && (
                <>
                  <p className="text-muted-foreground font-medium mt-2">Correct matches:</p>
                  <div className="grid gap-1">
                    {question.pairs.map((pair, pairIndex) => (
                      <div
                        key={pairIndex}
                        className="flex items-center gap-2 px-2 py-1 rounded text-sm bg-green-100 text-green-800"
                      >
                        <span>{pair.left}</span>
                        <span className="text-muted-foreground">→</span>
                        <span>{pair.right}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            {!isCorrect && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Explanation:</span> {question.explanation}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Fill in the Blank question review
  const renderFillBlankReview = (question: FillBlankQuestion, index: number) => {
    const answer = answers[question.id];
    const isCorrect = answer?.isCorrect ?? false;
    const userAnswer = answer?.userAnswer as string || '';
    const wasNotAnswered = !userAnswer || userAnswer.trim() === '';

    return (
      <div key={question.id} className={cn(
        "p-4 rounded-lg border",
        isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      )}>
        <div className="flex items-start gap-3">
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          )}
          <div className="flex-1">
            <p className="font-medium text-foreground mb-2">
              {index + 1}. {question.question.replace('___', '_____')}
              {wasNotAnswered && (
                <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                  Not Answered
                </span>
              )}
            </p>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-muted-foreground">Your answer:</span>{' '}
                <span className={cn(
                  "font-medium",
                  isCorrect ? "text-green-600" : "text-red-600",
                  !wasNotAnswered && !isCorrect && "line-through"
                )}>
                  {wasNotAnswered ? 'No answer' : `"${userAnswer}"`}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  <span className="text-muted-foreground">Acceptable answers:</span>{' '}
                  <span className="font-medium text-green-600">
                    {question.acceptableAnswers.join(', ')}
                  </span>
                </p>
              )}
            </div>
            {!isCorrect && (
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium">Explanation:</span> {question.explanation}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl"
    >
      {/* Header */}
      <motion.div variants={stepVariants} className="text-center mb-8">
        <div
          className={cn(
            'mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full',
            passed ? 'bg-green-100' : 'bg-amber-100'
          )}
        >
          <Trophy
            className={cn(
              'h-10 w-10',
              passed ? 'text-green-600' : 'text-amber-600'
            )}
          />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Quiz Complete!
        </h1>
        <p className="text-muted-foreground">
          {passed
            ? 'Great job! You passed the quiz.'
            : 'Keep studying and try again!'}
        </p>
      </motion.div>

      {/* Score Card */}
      <motion.div
        variants={stepVariants}
        className="rounded-2xl border border-border bg-card p-8 shadow-card mb-8"
      >
        {/* Overall Score */}
        <div className="text-center mb-8">
          <div className={cn('text-6xl font-bold mb-2', color)}>
            {Math.round(score.percentage)}%
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className={cn('text-2xl font-semibold', color)}>
              Grade: {grade}
            </span>
            {passed ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {score.total} correct out of {totalQuestions} questions
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Score Breakdown
          </h3>
          {categories.map((category) => {
            const percentage = (category.correct / category.total) * 100;
            return (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{category.name}</span>
                  <span className="font-medium text-foreground">
                    {category.correct}/{category.total}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={cn(
                      'h-full',
                      percentage === 100
                        ? 'bg-green-500'
                        : percentage >= 70
                        ? 'bg-teal-500'
                        : percentage >= 50
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Question Review Section */}
      <motion.div variants={stepVariants} className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Question Review
        </h2>

        {/* MCQ Section */}
        {quiz.mcq.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => toggleSection('mcq')}
              className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <span className="font-medium">Multiple Choice ({score.mcq}/{quiz.mcq.length})</span>
              {expandedSections.mcq ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {expandedSections.mcq && (
              <div className="mt-3 space-y-3">
                {quiz.mcq.map((q, i) => renderMCQReview(q, i))}
              </div>
            )}
          </div>
        )}

        {/* True/False Section */}
        {quiz.trueFalse.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => toggleSection('trueFalse')}
              className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <span className="font-medium">True/False ({score.trueFalse}/{quiz.trueFalse.length})</span>
              {expandedSections.trueFalse ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {expandedSections.trueFalse && (
              <div className="mt-3 space-y-3">
                {quiz.trueFalse.map((q, i) => renderTrueFalseReview(q, i))}
              </div>
            )}
          </div>
        )}

        {/* Matching Section */}
        {quiz.matching.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => toggleSection('matching')}
              className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <span className="font-medium">Matching ({score.matching}/{quiz.matching.length})</span>
              {expandedSections.matching ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {expandedSections.matching && (
              <div className="mt-3 space-y-3">
                {quiz.matching.map((q, i) => renderMatchingReview(q, i))}
              </div>
            )}
          </div>
        )}

        {/* Fill in the Blank Section */}
        {quiz.fillBlank.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => toggleSection('fillBlank')}
              className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <span className="font-medium">Fill in the Blank ({score.fillBlank}/{quiz.fillBlank.length})</span>
              {expandedSections.fillBlank ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {expandedSections.fillBlank && (
              <div className="mt-3 space-y-3">
                {quiz.fillBlank.map((q, i) => renderFillBlankReview(q, i))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={stepVariants}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <Button
          variant="outline"
          onClick={onBack}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="flex-1"
        >
          Go Back
        </Button>
        <Button
          variant="primary"
          onClick={onRetry}
          leftIcon={<RotateCcw className="h-4 w-4" />}
          className="flex-1"
        >
          Retake Quiz
        </Button>
      </motion.div>
    </motion.div>
  );
}
