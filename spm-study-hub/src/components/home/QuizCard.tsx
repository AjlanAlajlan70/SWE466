'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Brain, Trophy, CheckCircle, Clock, Star, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Chapter, ChapterProgress } from '@/data/chapters/types';
import { useRef, MouseEvent } from 'react';
import { trophyBounce, sparkle } from '@/lib/animations';

interface QuizCardProps {
  chapter: Chapter;
  progress?: ChapterProgress;
  index: number;
}

// Color schemes that alternate per card
const colorSchemes = [
  {
    gradient: 'from-teal-500 to-sky-500',
    bgGradient: 'from-teal-100 to-sky-100 dark:from-teal-900/30 dark:to-sky-900/30',
    border: 'hover:border-teal-300 dark:hover:border-teal-600',
    glow: 'group-hover:shadow-glow-teal',
    text: 'text-teal-600 dark:text-teal-400',
    iconBg: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  },
  {
    gradient: 'from-coral-500 to-rose-500',
    bgGradient: 'from-coral-100 to-rose-100 dark:from-coral-900/30 dark:to-rose-900/30',
    border: 'hover:border-coral-300 dark:hover:border-coral-600',
    glow: 'group-hover:shadow-glow-coral',
    text: 'text-coral-600 dark:text-coral-400',
    iconBg: 'bg-coral-100 dark:bg-coral-900/30 text-coral-600 dark:text-coral-400',
  },
  {
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30',
    border: 'hover:border-violet-300 dark:hover:border-violet-600',
    glow: 'group-hover:shadow-glow-violet',
    text: 'text-violet-600 dark:text-violet-400',
    iconBg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
  },
  {
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30',
    border: 'hover:border-amber-300 dark:hover:border-amber-600',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    text: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  },
  {
    gradient: 'from-sky-500 to-cyan-500',
    bgGradient: 'from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30',
    border: 'hover:border-sky-300 dark:hover:border-sky-600',
    glow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]',
    text: 'text-sky-600 dark:text-sky-400',
    iconBg: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400',
  },
  {
    gradient: 'from-rose-500 to-pink-500',
    bgGradient: 'from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30',
    border: 'hover:border-rose-300 dark:hover:border-rose-600',
    glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]',
    text: 'text-rose-600 dark:text-rose-400',
    iconBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
  },
];

export function QuizCard({ chapter, progress, index }: QuizCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const hasCompletedQuiz = progress?.quizScore !== undefined;
  const quizScore = progress?.quizScore;
  const slidesCompleted = progress?.slidesCompleted ?? false;

  const colorScheme = colorSchemes[index % colorSchemes.length];

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="perspective-1000"
    >
      <Link href={`/chapter/${chapter.slug}/quiz`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={cn(
            'group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-lg transition-all duration-300',
            colorScheme.border,
            colorScheme.glow,
            hasCompletedQuiz && 'border-teal-200 dark:border-teal-800',
            'dark:bg-slate-800/50 dark:border-slate-700/50'
          )}
        >
          {/* Floating Sparkles for Completed Quizzes */}
          {hasCompletedQuiz && (
            <>
              <motion.div
                variants={sparkle}
                initial="initial"
                animate="animate"
                className="absolute top-4 right-4"
                style={{ animationDelay: '0s' }}
              >
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              </motion.div>
              <motion.div
                variants={sparkle}
                initial="initial"
                animate="animate"
                className="absolute top-8 right-8"
                style={{ animationDelay: '0.5s' }}
              >
                <Sparkles className="h-3 w-3 text-amber-300" />
              </motion.div>
              <motion.div
                variants={sparkle}
                initial="initial"
                animate="animate"
                className="absolute top-12 right-3"
                style={{ animationDelay: '1s' }}
              >
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              </motion.div>
            </>
          )}

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-5', colorScheme.gradient)} />
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          {/* Quiz Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={cn(
              'relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg',
              colorScheme.gradient
            )}
          >
            <Brain className="h-7 w-7 text-white" />
          </motion.div>

          {/* Chapter Info */}
          <div className="relative mb-3">
            <span className={cn('text-xs font-medium', colorScheme.text)}>
              Chapter {chapter.chapterNumber} Quiz
            </span>
            <h3 className="mt-1 font-semibold text-foreground text-lg group-hover:text-foreground transition-colors">
              {chapter.title}
            </h3>
          </div>

          {/* Quiz Stats */}
          <div className="relative flex items-center gap-4 text-xs text-muted-foreground">
            <span className={cn('flex items-center gap-1.5 px-2 py-1 rounded-md', colorScheme.bgGradient)}>
              <Clock className="h-3.5 w-3.5" />
              {chapter.quiz.mcq.length + chapter.quiz.trueFalse.length +
                chapter.quiz.matching.length + chapter.quiz.fillBlank.length} questions
            </span>
          </div>

          {/* Status Section */}
          {hasCompletedQuiz && quizScore ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('mt-4 flex items-center justify-between rounded-xl px-4 py-3', colorScheme.bgGradient)}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  variants={trophyBounce}
                  initial="initial"
                  animate="animate"
                >
                  <Trophy className="h-5 w-5 text-amber-500" />
                </motion.div>
                <div>
                  <span className={cn('text-sm font-bold', colorScheme.text)}>
                    {Math.round(quizScore.percentage)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">Best Score</span>
                </div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
              >
                <CheckCircle className={cn('h-5 w-5', colorScheme.text)} />
              </motion.div>
            </motion.div>
          ) : slidesCompleted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl bg-gradient-to-r from-coral-100 to-teal-100 dark:from-coral-900/30 dark:to-teal-900/30 px-4 py-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-coral-600 dark:text-coral-400">
                  Ready to take quiz
                </span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4 text-coral-500" />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="mt-4 rounded-xl bg-muted/50 dark:bg-slate-700/30 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                Complete slides first
              </span>
            </div>
          )}

          {/* CTA */}
          <motion.div
            className={cn('relative mt-4 flex items-center gap-1 text-sm font-medium', colorScheme.text)}
          >
            <span>{hasCompletedQuiz ? 'Retake' : 'Start'} Quiz</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
