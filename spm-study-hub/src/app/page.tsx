'use client';

import { motion } from 'framer-motion';
import { BookOpen, Brain, Sparkles } from 'lucide-react';
import { getAllChapters } from '@/data/chapters';
import { useProgress } from '@/hooks/useProgress';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { ChapterCard } from '@/components/home/ChapterCard';
import { QuizCard } from '@/components/home/QuizCard';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { scrollReveal, staggerContainerAdvanced } from '@/lib/animations';

export default function Home() {
  const chapters = getAllChapters();
  const { getChapterProgress, isLoaded } = useProgress();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* Chapters Section */}
        <section id="chapters" className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
          {/* Background Gradient Mesh */}
          <div className="pointer-events-none absolute inset-0 gradient-mesh-subtle" />

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            className="pointer-events-none absolute top-20 -left-20 h-60 w-60 rounded-full bg-coral-200 dark:bg-coral-900/30 blob opacity-40"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pointer-events-none absolute bottom-20 -right-20 h-80 w-80 rounded-full bg-teal-200 dark:bg-teal-900/30 blob-2 opacity-30"
          />

          <div className="relative mx-auto max-w-7xl px-4 md:px-8">
            {/* Section Header */}
            <motion.div
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="mb-10 text-center"
            >
              {/* Section Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-100 via-amber-100 to-coral-100 dark:from-coral-900/30 dark:via-amber-900/30 dark:to-coral-900/30 px-5 py-2 text-sm font-medium shadow-md"
              >
                <BookOpen className="h-4 w-4 text-coral-500" />
                <span className="text-coral-700 dark:text-coral-400">Learning Modules</span>
                <Sparkles className="h-4 w-4 text-coral-500" />
              </motion.div>

              <h2 className="mb-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Course{' '}
                <span className="gradient-text">Chapters</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Start your journey through Software Project Management with our
                comprehensive, interactive chapters.
              </p>
            </motion.div>

            {/* Chapter Cards Grid */}
            <motion.div
              variants={staggerContainerAdvanced}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  progress={getChapterProgress(chapter.id)}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quizzes Section */}
        <section id="quizzes" className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-muted/30 dark:bg-slate-900/50">
          {/* Background Gradient Mesh */}
          <div className="pointer-events-none absolute inset-0 gradient-mesh-subtle" />

          {/* Decorative Blobs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.35 }}
            viewport={{ once: true }}
            className="pointer-events-none absolute top-1/4 -right-32 h-72 w-72 rounded-full bg-violet-200 dark:bg-violet-900/30 blob opacity-35"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.25 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pointer-events-none absolute bottom-1/4 -left-32 h-64 w-64 rounded-full bg-teal-200 dark:bg-teal-900/30 blob-2 opacity-25"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-coral-200 dark:bg-coral-900/20 blob opacity-20"
          />

          <div className="relative mx-auto max-w-7xl px-4 md:px-8">
            {/* Section Header */}
            <motion.div
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="mb-10 text-center"
            >
              {/* Section Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-100 via-sky-100 to-teal-100 dark:from-teal-900/30 dark:via-sky-900/30 dark:to-teal-900/30 px-5 py-2 text-sm font-medium shadow-md"
              >
                <Brain className="h-4 w-4 text-teal-500" />
                <span className="text-teal-700 dark:text-teal-400">Test Your Knowledge</span>
                <Sparkles className="h-4 w-4 text-teal-500" />
              </motion.div>

              <h2 className="mb-4 font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl">
                Chapter{' '}
                <span className="gradient-text-cool">Quizzes</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Test your knowledge after completing each chapter with our
                comprehensive quizzes featuring multiple question types.
              </p>
            </motion.div>

            {/* Quiz Cards Grid */}
            <motion.div
              variants={staggerContainerAdvanced}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {chapters.map((chapter, index) => (
                <QuizCard
                  key={chapter.id}
                  chapter={chapter}
                  progress={getChapterProgress(chapter.id)}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}
