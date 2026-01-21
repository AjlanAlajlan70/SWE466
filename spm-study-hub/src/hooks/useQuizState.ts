'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Quiz,
  MCQQuestion,
  TrueFalseQuestion,
  MatchingQuestion,
  FillBlankQuestion,
  QuizScore,
} from '@/data/chapters/types';
import { shuffleArray } from '@/lib/utils';

type QuizType = 'mcq' | 'trueFalse' | 'matching' | 'fillBlank';
type QuizQuestion = MCQQuestion | TrueFalseQuestion | MatchingQuestion | FillBlankQuestion;

interface QuizAnswer {
  questionId: string;
  isCorrect: boolean;
  userAnswer: unknown;
}

interface UseQuizStateProps {
  quiz: Quiz;
  onComplete?: (score: QuizScore) => void;
}

interface UseQuizStateReturn {
  currentType: QuizType;
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestionsForType: number;
  answers: Record<string, QuizAnswer>;
  showExplanation: boolean;
  lastAnswerCorrect: boolean | null;
  isQuizComplete: boolean;
  score: QuizScore | null;
  submitAnswer: (answer: unknown) => void;
  submitQuiz: () => void;
  nextQuestion: () => void;
  changeQuizType: (type: QuizType) => void;
  reset: () => void;
  getTypeProgress: (type: QuizType) => { answered: number; total: number; correct: number };
  totalAnswered: number;
  totalQuestions: number;
}

const QUIZ_TYPE_ORDER: QuizType[] = ['mcq', 'trueFalse', 'matching', 'fillBlank'];

/**
 * Hook for managing quiz state and scoring
 */
export function useQuizState({ quiz, onComplete }: UseQuizStateProps): UseQuizStateReturn {
  const [currentType, setCurrentType] = useState<QuizType>('mcq');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  // Initialize with original order to avoid hydration mismatch
  const [shuffledQuestions, setShuffledQuestions] = useState<Record<QuizType, QuizQuestion[]>>({
    mcq: [...quiz.mcq],
    trueFalse: [...quiz.trueFalse],
    matching: [...quiz.matching],
    fillBlank: [...quiz.fillBlank],
  });

  // Shuffle questions only on client side after mount
  useEffect(() => {
    setShuffledQuestions({
      mcq: shuffleArray([...quiz.mcq]),
      trueFalse: shuffleArray([...quiz.trueFalse]),
      matching: shuffleArray([...quiz.matching]),
      fillBlank: shuffleArray([...quiz.fillBlank]),
    });
  }, [quiz]);

  // Get questions for current type
  const questionsForType = shuffledQuestions[currentType];
  const totalQuestionsForType = questionsForType.length;
  const currentQuestion = questionsForType[currentQuestionIndex];

  // Calculate totals
  const totalQuestions = quiz.mcq.length + quiz.trueFalse.length + quiz.matching.length + quiz.fillBlank.length;
  const totalAnswered = Object.keys(answers).length;

  // Check if all questions are answered
  const allQuestionsAnswered = useMemo(() => {
    return totalAnswered === totalQuestions;
  }, [totalAnswered, totalQuestions]);

  // Calculate score (works for both complete and partial submissions)
  const score = useMemo((): QuizScore | null => {
    if (!isQuizComplete) return null;

    const mcqAnswers = quiz.mcq.map((q) => answers[q.id]).filter(Boolean);
    const tfAnswers = quiz.trueFalse.map((q) => answers[q.id]).filter(Boolean);
    const matchAnswers = quiz.matching.map((q) => answers[q.id]).filter(Boolean);
    const fbAnswers = quiz.fillBlank.map((q) => answers[q.id]).filter(Boolean);

    const mcqCorrect = mcqAnswers.filter((a) => a.isCorrect).length;
    const tfCorrect = tfAnswers.filter((a) => a.isCorrect).length;
    const matchCorrect = matchAnswers.filter((a) => a.isCorrect).length;
    const fbCorrect = fbAnswers.filter((a) => a.isCorrect).length;

    const total = mcqCorrect + tfCorrect + matchCorrect + fbCorrect;

    return {
      mcq: mcqCorrect,
      trueFalse: tfCorrect,
      matching: matchCorrect,
      fillBlank: fbCorrect,
      total,
      percentage: (total / totalQuestions) * 100,
      completedAt: new Date().toISOString(),
    };
  }, [isQuizComplete, answers, quiz, totalQuestions]);

  // Validate MCQ answer
  const validateMCQ = (question: MCQQuestion, selectedIndex: number): boolean => {
    return selectedIndex === question.correctIndex;
  };

  // Validate True/False answer
  const validateTrueFalse = (question: TrueFalseQuestion, selected: boolean): boolean => {
    return selected === question.isTrue;
  };

  // Validate Matching answer
  const validateMatching = (
    question: MatchingQuestion,
    userPairs: Array<{ left: string; right: string }>
  ): boolean => {
    return question.pairs.every((correctPair) =>
      userPairs.some(
        (userPair) =>
          userPair.left === correctPair.left && userPair.right === correctPair.right
      )
    );
  };

  // Validate Fill in the Blank answer
  const validateFillBlank = (question: FillBlankQuestion, userAnswer: string): boolean => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    return question.acceptableAnswers.some(
      (acceptable) => acceptable.toLowerCase().trim() === normalizedAnswer
    );
  };

  // Submit answer for current question
  const submitAnswer = useCallback(
    (answer: unknown) => {
      if (!currentQuestion || answers[currentQuestion.id]) return;

      let isCorrect = false;

      switch (currentType) {
        case 'mcq':
          isCorrect = validateMCQ(currentQuestion as MCQQuestion, answer as number);
          break;
        case 'trueFalse':
          isCorrect = validateTrueFalse(currentQuestion as TrueFalseQuestion, answer as boolean);
          break;
        case 'matching':
          isCorrect = validateMatching(
            currentQuestion as MatchingQuestion,
            answer as Array<{ left: string; right: string }>
          );
          break;
        case 'fillBlank':
          isCorrect = validateFillBlank(currentQuestion as FillBlankQuestion, answer as string);
          break;
      }

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          questionId: currentQuestion.id,
          isCorrect,
          userAnswer: answer,
        },
      }));

      setLastAnswerCorrect(isCorrect);
      setShowExplanation(true);
    },
    [currentQuestion, currentType, answers]
  );

  // Move to next question
  const nextQuestion = useCallback(() => {
    setShowExplanation(false);
    setLastAnswerCorrect(null);

    if (currentQuestionIndex < totalQuestionsForType - 1) {
      // More questions in current type
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Move to next quiz type
      const currentTypeIndex = QUIZ_TYPE_ORDER.indexOf(currentType);
      for (let i = currentTypeIndex + 1; i < QUIZ_TYPE_ORDER.length; i++) {
        const nextType = QUIZ_TYPE_ORDER[i];
        if (shuffledQuestions[nextType].length > 0) {
          setCurrentType(nextType);
          setCurrentQuestionIndex(0);
          return;
        }
      }
      // Quiz complete - trigger callback
      if (score) {
        onComplete?.(score);
      }
    }
  }, [currentQuestionIndex, totalQuestionsForType, currentType, shuffledQuestions, score, onComplete]);

  // Change quiz type (tab)
  const changeQuizType = useCallback((type: QuizType) => {
    if (shuffledQuestions[type].length > 0) {
      setCurrentType(type);
      // Find first unanswered question in this type
      const firstUnanswered = shuffledQuestions[type].findIndex(
        (q) => !answers[q.id]
      );
      setCurrentQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
      setShowExplanation(false);
      setLastAnswerCorrect(null);
    }
  }, [shuffledQuestions, answers]);

  // Get progress for a quiz type
  const getTypeProgress = useCallback(
    (type: QuizType) => {
      const questions = shuffledQuestions[type];
      const answeredQuestions = questions.filter((q) => answers[q.id]);
      const correctAnswers = answeredQuestions.filter((q) => answers[q.id]?.isCorrect);

      return {
        answered: answeredQuestions.length,
        total: questions.length,
        correct: correctAnswers.length,
      };
    },
    [shuffledQuestions, answers]
  );

  // Submit quiz - mark unanswered questions as wrong and complete the quiz
  const submitQuiz = useCallback(() => {
    // Mark all unanswered questions as wrong
    const newAnswers: Record<string, QuizAnswer> = { ...answers };

    // Mark unanswered MCQ questions
    quiz.mcq.forEach((q) => {
      if (!newAnswers[q.id]) {
        newAnswers[q.id] = {
          questionId: q.id,
          isCorrect: false,
          userAnswer: null, // No answer provided
        };
      }
    });

    // Mark unanswered True/False questions
    quiz.trueFalse.forEach((q) => {
      if (!newAnswers[q.id]) {
        newAnswers[q.id] = {
          questionId: q.id,
          isCorrect: false,
          userAnswer: null,
        };
      }
    });

    // Mark unanswered Matching questions
    quiz.matching.forEach((q) => {
      if (!newAnswers[q.id]) {
        newAnswers[q.id] = {
          questionId: q.id,
          isCorrect: false,
          userAnswer: [],
        };
      }
    });

    // Mark unanswered Fill in the Blank questions
    quiz.fillBlank.forEach((q) => {
      if (!newAnswers[q.id]) {
        newAnswers[q.id] = {
          questionId: q.id,
          isCorrect: false,
          userAnswer: '',
        };
      }
    });

    setAnswers(newAnswers);
    setIsQuizComplete(true);
    setShowExplanation(false);
  }, [answers, quiz]);

  // Reset quiz
  const reset = useCallback(() => {
    setCurrentType('mcq');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setLastAnswerCorrect(null);
    setIsQuizComplete(false);
    setShuffledQuestions({
      mcq: shuffleArray([...quiz.mcq]),
      trueFalse: shuffleArray([...quiz.trueFalse]),
      matching: shuffleArray([...quiz.matching]),
      fillBlank: shuffleArray([...quiz.fillBlank]),
    });
  }, [quiz]);

  // Trigger onComplete when quiz is done
  useEffect(() => {
    if (isQuizComplete && score) {
      onComplete?.(score);
    }
  }, [isQuizComplete, score, onComplete]);

  // Auto-complete when all questions are answered
  useEffect(() => {
    if (allQuestionsAnswered && !isQuizComplete) {
      setIsQuizComplete(true);
    }
  }, [allQuestionsAnswered, isQuizComplete]);

  return {
    currentType,
    currentQuestion,
    currentQuestionIndex,
    totalQuestionsForType,
    answers,
    showExplanation,
    lastAnswerCorrect,
    isQuizComplete,
    score,
    submitAnswer,
    submitQuiz,
    nextQuestion,
    changeQuizType,
    reset,
    getTypeProgress,
    totalAnswered,
    totalQuestions,
  };
}
