'use client';

import { motion } from 'framer-motion';
import { ComparisonSlide as ComparisonSlideType } from '@/data/chapters/types';
import { stepVariants, staggerContainer } from '@/lib/animations';

interface ComparisonSlideProps {
  slide: ComparisonSlideType;
  visibleSteps: number;
}

export function ComparisonSlide({ slide, visibleSteps }: ComparisonSlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl"
    >
      {/* Header */}
      <motion.h2
        variants={stepVariants}
        className="mb-8 text-center font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl"
      >
        {slide.title}
      </motion.h2>

      {/* Side-by-side Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        {visibleSteps >= 1 && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-coral-200 dark:border-coral-800/50 bg-gradient-to-br from-coral-50 to-orange-50 dark:from-coral-900/30 dark:to-orange-900/30 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-coral-800 dark:text-coral-300">
              {slide.leftColumn.title}
            </h3>
            <ul className="space-y-3">
              {slide.leftColumn.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral-500" />
                  <span className="text-coral-700 dark:text-coral-400">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Right Column */}
        {visibleSteps >= 2 && (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            className="rounded-xl border border-teal-200 dark:border-teal-800/50 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-teal-800 dark:text-teal-300">
              {slide.rightColumn.title}
            </h3>
            <ul className="space-y-3">
              {slide.rightColumn.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-500" />
                  <span className="text-teal-700 dark:text-teal-400">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
