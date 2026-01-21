'use client';

import { motion } from 'framer-motion';
import { MindmapSlide as MindmapSlideType } from '@/data/chapters/types';
import { stepVariants, staggerContainer } from '@/lib/animations';

interface MindmapSlideProps {
  slide: MindmapSlideType;
  visibleSteps: number;
}

// Colors for branches
const branchColors = [
  { bg: 'bg-coral-500', light: 'bg-coral-100 dark:bg-coral-900/30', text: 'text-coral-700 dark:text-coral-400', border: 'border-coral-300 dark:border-coral-700' },
  { bg: 'bg-teal-500', light: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-400', border: 'border-teal-300 dark:border-teal-700' },
  { bg: 'bg-purple-500', light: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-700' },
  { bg: 'bg-amber-500', light: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300 dark:border-amber-700' },
  { bg: 'bg-blue-500', light: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-300 dark:border-blue-700' },
  { bg: 'bg-emerald-500', light: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700' },
];

export function MindmapSlide({ slide, visibleSteps }: MindmapSlideProps) {
  const totalBranches = slide.branches.length;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-6xl px-4"
    >
      {/* Header */}
      <motion.div variants={stepVariants} className="mb-6 text-center">
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          {slide.title}
        </h2>
      </motion.div>

      {/* Mind Map Layout */}
      <div className="relative">
        {/* Center Node */}
        {visibleSteps >= 1 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mx-auto mb-8 w-fit"
          >
            <div className="rounded-2xl border-3 border-primary bg-gradient-to-br from-primary/20 to-primary/5 px-8 py-4 shadow-lg">
              <span className="text-lg font-bold text-primary md:text-xl">
                {slide.centerLabel}
              </span>
            </div>
          </motion.div>
        )}

        {/* Branches in a radial-style grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slide.branches.map((branch, branchIndex) => {
            const colorScheme = branchColors[branchIndex % branchColors.length];
            const isVisible = branchIndex + 2 <= visibleSteps;

            if (!isVisible) return null;

            return (
              <motion.div
                key={branchIndex}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: branchIndex * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                className={`relative rounded-xl border-2 ${colorScheme.border} ${colorScheme.light} p-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-1`}
              >
                {/* Connecting dot to simulate branch */}
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full ${colorScheme.bg} shadow-sm`} />

                {/* Branch Label */}
                <div className={`mb-3 text-center font-semibold ${colorScheme.text} text-sm md:text-base`}>
                  {branch.label}
                </div>

                {/* Divider */}
                <div className={`mb-3 h-0.5 ${colorScheme.bg} opacity-30 rounded-full`} />

                {/* Branch Items */}
                <ul className="space-y-1.5">
                  {branch.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + itemIndex * 0.05 }}
                      className="flex items-start gap-2 text-xs md:text-sm text-foreground/80"
                    >
                      <span className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${colorScheme.bg}`} />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Visual connecting lines from center (decorative) */}
        {visibleSteps >= 2 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-primary/50 to-transparent pointer-events-none hidden lg:block" />
        )}
      </div>
    </motion.div>
  );
}
