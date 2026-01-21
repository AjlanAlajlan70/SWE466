'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, BookCheck, Sparkles } from 'lucide-react';
import { Chapter, ChapterProgress } from '@/data/chapters/types';
import { cn } from '@/lib/utils';
import { useRef, MouseEvent } from 'react';

interface ChapterCardProps {
  chapter: Chapter;
  progress?: ChapterProgress;
  index: number;
}

// Color schemes that rotate per card
const colorSchemes = [
  {
    gradient: 'from-coral-500 to-rose-500',
    bgGradient: 'from-coral-100 to-rose-100 dark:from-coral-900/30 dark:to-rose-900/30',
    border: 'hover:border-coral-300 dark:hover:border-coral-600',
    glow: 'group-hover:shadow-glow-coral',
    text: 'text-coral-600 dark:text-coral-400',
    badge: 'bg-coral-100 dark:bg-coral-900/30 text-coral-700 dark:text-coral-400',
  },
  {
    gradient: 'from-teal-500 to-sky-500',
    bgGradient: 'from-teal-100 to-sky-100 dark:from-teal-900/30 dark:to-sky-900/30',
    border: 'hover:border-teal-300 dark:hover:border-teal-600',
    glow: 'group-hover:shadow-glow-teal',
    text: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  },
  {
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30',
    border: 'hover:border-violet-300 dark:hover:border-violet-600',
    glow: 'group-hover:shadow-glow-violet',
    text: 'text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
  },
  {
    gradient: 'from-amber-500 to-orange-500',
    bgGradient: 'from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30',
    border: 'hover:border-amber-300 dark:hover:border-amber-600',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  },
  {
    gradient: 'from-sky-500 to-cyan-500',
    bgGradient: 'from-sky-100 to-cyan-100 dark:from-sky-900/30 dark:to-cyan-900/30',
    border: 'hover:border-sky-300 dark:hover:border-sky-600',
    glow: 'group-hover:shadow-[0_0_30px_rgba(14,165,233,0.4)]',
    text: 'text-sky-600 dark:text-sky-400',
    badge: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400',
  },
  {
    gradient: 'from-rose-500 to-pink-500',
    bgGradient: 'from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30',
    border: 'hover:border-rose-300 dark:hover:border-rose-600',
    glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
  },
];

export function ChapterCard({ chapter, progress, index }: ChapterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const isStarted = progress !== undefined;
  const isSlidesFinished = progress?.slidesCompleted === true;
  const isComplete = isSlidesFinished && progress?.quizScore;
  const quizScore = progress?.quizScore?.percentage;

  const colorScheme = colorSchemes[index % colorSchemes.length];

  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

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
      <Link href={`/chapter/${chapter.slug}`} className="block">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={cn(
            'group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg transition-all duration-300',
            colorScheme.border,
            colorScheme.glow,
            'dark:bg-slate-800/50 dark:border-slate-700/50'
          )}
        >
          {/* Animated Gradient Border on Hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-r opacity-10', colorScheme.gradient)} />
          </div>

          {/* Shine Sweep Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          {/* Chapter Number Badge */}
          <div className="relative mb-4 flex items-center justify-between">
            <motion.span
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-lg',
                colorScheme.gradient
              )}
            >
              {chapter.chapterNumber}
            </motion.span>

            {/* Status Badge with Spring Animation */}
            {isComplete ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-400"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Complete
                <Sparkles className="h-3 w-3" />
              </motion.span>
            ) : isSlidesFinished ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400"
              >
                <BookCheck className="h-3.5 w-3.5" />
                Finished
              </motion.span>
            ) : isStarted ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400"
              >
                <Clock className="h-3.5 w-3.5" />
                In Progress
              </motion.span>
            ) : null}
          </div>

          {/* Icon & Title */}
          <div className="relative mb-3">
            <motion.span
              className="text-4xl"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {chapter.icon}
            </motion.span>
          </div>

          <h3 className="relative mb-2 font-serif text-xl font-medium text-foreground">
            {chapter.title}
          </h3>

          <p className="relative mb-4 text-sm text-muted-foreground line-clamp-2">
            {chapter.description}
          </p>

          {/* Stats */}
          <div className="relative mb-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className={cn('px-2 py-1 rounded-md', colorScheme.bgGradient)}>
              {chapter.slides.length} slides
            </span>
            <span className={cn('px-2 py-1 rounded-md', colorScheme.bgGradient)}>
              {chapter.quiz.mcq.length +
                chapter.quiz.trueFalse.length +
                chapter.quiz.matching.length +
                chapter.quiz.fillBlank.length}{' '}
              questions
            </span>
          </div>

          {/* Quiz Score with Animated Progress Bar */}
          {quizScore !== undefined && (
            <div className="relative mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Quiz Score</span>
                <span
                  className={cn(
                    'font-medium',
                    quizScore >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {Math.round(quizScore)}%
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${quizScore}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'h-full rounded-full',
                    quizScore >= 70
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                      : 'bg-gradient-to-r from-red-400 to-rose-500'
                  )}
                />
              </div>
            </div>
          )}

          {/* CTA with Animated Arrow */}
          <motion.div
            className={cn('relative flex items-center gap-1 text-sm font-medium', colorScheme.text)}
          >
            <span>{isStarted ? 'Continue' : 'Start'} Chapter</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </motion.div>

          {/* 3D Transform Layer */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ transform: 'translateZ(20px)' }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
