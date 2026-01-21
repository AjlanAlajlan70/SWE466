'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Trophy } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, stepVariants } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-coral-50 via-background to-teal-50 opacity-50" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}
          <motion.div variants={stepVariants} className="mb-6">
            <span className="inline-flex items-center rounded-full bg-coral-100 px-4 py-1.5 text-sm font-medium text-coral-700">
              Interactive Learning Platform
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={stepVariants}
            className="mb-6 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Master{' '}
            <span className="bg-gradient-to-r from-coral-500 to-teal-500 bg-clip-text text-transparent">
              Software Project Management
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={stepVariants}
            className="mb-8 text-lg text-muted-foreground md:text-xl"
          >
            Interactive slides, comprehensive quizzes, and AI-powered assistance
            to help you ace your SPM course.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={stepVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="#chapters">
              <Button
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Start Learning
              </Button>
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={stepVariants}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral-100">
                <BookOpen className="h-6 w-6 text-coral-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                Interactive Slides
              </h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step lessons with engaging animations
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <Trophy className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                Quizzes & Tests
              </h3>
              <p className="text-sm text-muted-foreground">
                Multiple question types with instant feedback
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                <Brain className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Get help with any concept anytime
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
