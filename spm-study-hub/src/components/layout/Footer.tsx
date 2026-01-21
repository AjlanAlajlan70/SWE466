'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Heart, Linkedin, Github, ArrowUp, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/ajlan-alajlan-064297292/',
      icon: Linkedin,
      label: 'LinkedIn',
      hoverBg: 'hover:bg-[#0077B5]',
      hoverText: 'hover:text-white',
      hoverShadow: 'hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]',
    },
    {
      href: 'https://github.com/AjlanAlajlan70',
      icon: Github,
      label: 'GitHub',
      hoverBg: 'hover:bg-foreground dark:hover:bg-white',
      hoverText: 'hover:text-white dark:hover:text-slate-900',
      hoverShadow: 'hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]',
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-br from-background via-muted/30 to-background dark:from-slate-900 dark:via-slate-800/50 dark:to-slate-900">
      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-coral-300 dark:bg-coral-500 blob opacity-30"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="absolute -bottom-10 right-1/4 h-40 w-40 rounded-full bg-teal-300 dark:bg-teal-500 blob-2 opacity-20"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.25 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-violet-300 dark:bg-violet-500 blob opacity-25"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 md:items-start"
          >
            <Link href="/" className="group flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 via-coral-600 to-teal-500 shadow-lg transition-shadow group-hover:shadow-glow-coral"
              >
                <GraduationCap className="h-6 w-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-medium text-foreground">
                  SPM Hub
                </span>
                <span className="text-xs text-muted-foreground">
                  Software Project Management
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} SPM Study Hub. All rights reserved.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-3 md:items-start"
          >
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-coral-500" />
              Quick Links
            </h4>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/#chapters"
                className="text-muted-foreground hover:text-coral-500 transition-colors"
              >
                Chapters
              </Link>
              <Link
                href="/#quizzes"
                className="text-muted-foreground hover:text-teal-500 transition-colors"
              >
                Quizzes
              </Link>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-teal-500" />
              Connect With Me
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: 'spring',
                    stiffness: 400,
                    damping: 15,
                  }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-card border border-border text-muted-foreground shadow-md transition-all duration-300 ${link.hoverBg} ${link.hoverText} hover:border-transparent ${link.hoverShadow} dark:bg-slate-800 dark:border-slate-700`}
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="h-5 w-5 fill-coral-500 text-coral-500" />
              </motion.div>
              <span>for SPM students</span>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-glow-coral"
            >
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
              Back to Top
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 h-1 w-full origin-left rounded-full bg-gradient-to-r from-coral-500 via-teal-500 to-violet-500"
        />
      </div>
    </footer>
  );
}
