'use client';

import { motion } from 'framer-motion';
import { TitleSlide as TitleSlideType } from '@/data/chapters/types';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';

interface TitleSlideProps {
  slide: TitleSlideType;
}

export function TitleSlide({ slide }: TitleSlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      {/* Chapter Number Badge */}
      <motion.div
        variants={fadeIn}
        className="mb-6 inline-flex items-center rounded-full bg-coral-100 dark:bg-coral-900/40 px-4 py-1.5 text-sm font-medium text-coral-700 dark:text-coral-400"
      >
        Chapter {slide.chapterNumber}
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={slideUp}
        className="mb-4 max-w-4xl font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl"
      >
        {slide.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={slideUp}
        className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
      >
        {slide.subtitle}
      </motion.p>

      {/* Objective */}
      <motion.div
        variants={slideUp}
        className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm"
      >
        <p className="text-sm font-medium text-muted-foreground">
          Learning Objective
        </p>
        <p className="mt-1 text-foreground">{slide.objective}</p>
      </motion.div>
    </motion.div>
  );
}
