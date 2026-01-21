'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { staggerContainer, stepVariants, heroTextReveal, badgePopIn, floatingElement } from '@/lib/animations';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Slides',
      description: 'Step-by-step lessons with engaging animations',
      gradient: 'from-coral-500 to-rose-500',
      bgGradient: 'from-coral-100 to-rose-100 dark:from-coral-500/20 dark:to-rose-500/20',
      glowColor: 'group-hover:shadow-glow-coral',
    },
    {
      icon: Trophy,
      title: 'Quizzes & Tests',
      description: 'Multiple question types with instant feedback',
      gradient: 'from-teal-500 to-sky-500',
      bgGradient: 'from-teal-100 to-sky-100 dark:from-teal-500/20 dark:to-sky-500/20',
      glowColor: 'group-hover:shadow-glow-teal',
    },
    {
      icon: Brain,
      title: 'AI Assistant',
      description: 'Get help with any concept anytime',
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-100 to-purple-100 dark:from-violet-500/20 dark:to-purple-500/20',
      glowColor: 'group-hover:shadow-glow-violet',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Animated Gradient Mesh Background */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-0 gradient-mesh"
      />

      {/* Floating Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-coral-300 blob opacity-60"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-teal-300 blob-2 opacity-50"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-violet-300 blob opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20 lg:py-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Animated Badge */}
          <motion.div variants={badgePopIn} className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-100 via-amber-100 to-teal-100 dark:from-coral-900/50 dark:via-amber-900/50 dark:to-teal-900/50 px-5 py-2 text-sm font-medium shadow-lg">
              <Sparkles className="h-4 w-4 text-coral-500 animate-pulse" />
              <span className="gradient-text-vibrant font-semibold">
                Interactive Learning Platform
              </span>
              <Sparkles className="h-4 w-4 text-teal-500 animate-pulse" />
            </span>
          </motion.div>

          {/* Giant Title */}
          <motion.div
            variants={heroTextReveal}
            className="perspective-1000 mb-8"
          >
            <h1 className="font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Master{' '}
              <span className="relative inline-block">
                <span className="gradient-text-vibrant">
                  Software Project
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 h-1.5 w-full origin-left rounded-full bg-gradient-to-r from-coral-500 via-teal-500 to-violet-500"
                />
              </span>
              <br />
              <span className="gradient-text">Management</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={stepVariants}
            className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-2xl mx-auto"
          >
            Interactive slides, comprehensive quizzes, and AI-powered assistance
            to help you ace your SPM course.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={stepVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Primary Button - Gradient with Shine */}
            <Link href="#chapters">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-coral-500 via-coral-600 to-teal-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-glow-coral"
                style={{ backgroundSize: '200% auto' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Learning
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ translateX: ['100%', '-100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.button>
            </Link>

            {/* Secondary Button - Glass */}
            <Link href="#quizzes">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-2xl border border-white/30 bg-white/60 px-8 py-4 text-lg font-semibold text-foreground shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/80 hover:border-coral-200"
              >
                <span className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-teal-600" />
                  Take a Quiz
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            variants={stepVariants}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 dark:bg-slate-800/90 dark:border-slate-600/50 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 ${feature.glowColor}`}
              >
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20`} />
                </div>

                {/* Icon + Title Row */}
                <div className="relative flex items-center gap-4 mb-3">
                  <motion.div
                    variants={floatingElement}
                    initial="initial"
                    animate="animate"
                    className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.bgGradient} shadow-md`}
                  >
                    <feature.icon className={`h-6 w-6 absolute text-coral-600`} style={{ opacity: index === 0 ? 1 : 0 }} />
                    <feature.icon className={`h-6 w-6 absolute text-teal-600`} style={{ opacity: index === 1 ? 1 : 0 }} />
                    <feature.icon className={`h-6 w-6 absolute text-violet-600`} style={{ opacity: index === 2 ? 1 : 0 }} />
                  </motion.div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative text-sm text-muted-foreground">
                  {feature.description}
                </p>

                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
