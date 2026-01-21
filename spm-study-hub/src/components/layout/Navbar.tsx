'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Home, ClipboardList, GraduationCap, Moon, Sun, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mobileMenuVariants, mobileMenuItemVariants } from '@/lib/animations';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/#chapters', label: 'Chapters', icon: BookOpen },
  { href: '/#quizzes', label: 'Quizzes', icon: ClipboardList },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode
  useEffect(() => {
    // Check for saved preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 via-coral-600 to-teal-500 shadow-lg transition-shadow group-hover:shadow-glow-coral"
            >
              <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-white" />
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-coral-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ filter: 'blur(8px)', zIndex: -1 }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-medium text-foreground">
                SPM Hub
              </span>
              <span className="hidden sm:block text-[10px] text-muted-foreground -mt-1">
                Software Project Management
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.replace('/#', '/')));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'text-coral-600 dark:text-coral-400'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </motion.div>
                  {/* Animated Underline */}
                  <motion.div
                    className="absolute -bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-coral-500 to-teal-500 rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{
                      width: isActive ? '60%' : 0,
                      x: '-50%'
                    }}
                    whileHover={{ width: '60%' }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              );
            })}

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5 text-amber-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5 text-violet-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* CTA Button */}
            <Link href="#chapters">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-coral-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-shadow hover:shadow-glow-coral"
              >
                <Sparkles className="h-4 w-4" />
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Dark Mode Toggle - Mobile */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-muted-foreground"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-violet-500" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-muted-foreground"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden md:hidden"
            >
              <div className="space-y-2 pb-6 pt-2">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      variants={mobileMenuItemVariants}
                      custom={index}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all',
                          isActive
                            ? 'bg-gradient-to-r from-coral-100 to-teal-100 dark:from-coral-900/30 dark:to-teal-900/30 text-coral-700 dark:text-coral-400'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div variants={mobileMenuItemVariants}>
                  <Link
                    href="#chapters"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral-500 to-teal-500 px-6 py-3 text-base font-semibold text-white shadow-lg"
                  >
                    <Sparkles className="h-5 w-5" />
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
