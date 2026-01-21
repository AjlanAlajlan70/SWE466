'use client';

import { motion } from 'framer-motion';
import { TimelineSlide as TimelineSlideType } from '@/data/chapters/types';
import { stepVariants, staggerContainer } from '@/lib/animations';

interface TimelineSlideProps {
  slide: TimelineSlideType;
  visibleSteps: number;
}

export function TimelineSlide({ slide, visibleSteps }: TimelineSlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl"
    >
      {/* Header */}
      <motion.h2
        variants={stepVariants}
        className="mb-8 text-center font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl"
      >
        {slide.title}
      </motion.h2>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-coral-500 via-teal-500 to-coral-500 md:left-1/2 md:-translate-x-0.5" />

        {/* Events */}
        <div className="space-y-8">
          {slide.events.map((event, index) => (
            index < visibleSteps && (
              <motion.div
                key={index}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                className={`relative flex items-start gap-4 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-coral-500 to-teal-500 md:left-1/2">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 flex-1 md:ml-0 ${
                    index % 2 === 0
                      ? 'md:pr-12 md:text-right'
                      : 'md:pl-12 md:text-left'
                  }`}
                >
                  <div
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                      index % 2 === 0
                        ? 'bg-coral-100 text-coral-700'
                        : 'bg-teal-100 text-teal-700'
                    }`}
                  >
                    {event.year}
                  </div>
                  <h3 className="mt-2 font-semibold text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            )
          ))}
        </div>
      </div>
    </motion.div>
  );
}
