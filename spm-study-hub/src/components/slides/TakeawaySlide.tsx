'use client';

import { motion } from 'framer-motion';
import { TakeawaySlide as TakeawaySlideType } from '@/data/chapters/types';
import { stepVariants, staggerContainer } from '@/lib/animations';
import { IconBox } from '@/components/ui/IconBox';

interface TakeawaySlideProps {
  slide: TakeawaySlideType;
  visibleSteps: number;
}

export function TakeawaySlide({ slide, visibleSteps }: TakeawaySlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl"
    >
      {/* Header */}
      <motion.div variants={stepVariants} className="mb-8 text-center">
        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          {slide.title}
        </h2>
      </motion.div>

      {/* 2x2 Grid of Key Points */}
      <div className="grid gap-6 md:grid-cols-2">
        {slide.points.map((point, index) => (
          index < visibleSteps && (
            <motion.div
              key={index}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <IconBox
                  size="lg"
                  variant={index % 2 === 0 ? 'coral' : 'teal'}
                >
                  {point.icon}
                </IconBox>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </div>
    </motion.div>
  );
}
