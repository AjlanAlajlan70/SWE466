'use client';

import { motion } from 'framer-motion';
import { SectionSlide as SectionSlideType } from '@/data/chapters/types';
import { fadeIn, slideUp } from '@/lib/animations';

interface SectionSlideProps {
  slide: SectionSlideType;
}

export function SectionSlide({ slide }: SectionSlideProps) {
  return (
    <div className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      {/* Large Background Number */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span className="text-[20rem] font-bold leading-none text-coral-100/50 md:text-[25rem]">
          {slide.sectionNumber}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center"
      >
        <div className="mb-3 text-sm font-medium uppercase tracking-wider text-coral-600">
          Section {slide.sectionNumber}
        </div>
        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {slide.title}
        </h2>
      </motion.div>

      {/* Decorative Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
