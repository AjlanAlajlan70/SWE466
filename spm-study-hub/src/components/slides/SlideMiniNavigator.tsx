'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Layers, BookOpen, Target, GitCompare, Clock, Lightbulb, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slide } from '@/data/chapters/types';

interface SlideMiniNavigatorProps {
  slides: Slide[];
  currentSlideIndex: number;
  onGoToSlide: (index: number) => void;
}

// Get icon and color for slide type
function getSlideTypeInfo(slide: Slide): { icon: React.ReactNode; color: string; label: string } {
  switch (slide.type) {
    case 'title':
      return { icon: <BookOpen className="h-3 w-3" />, color: 'bg-coral-500', label: 'Title' };
    case 'section':
      return { icon: <Layers className="h-3 w-3" />, color: 'bg-teal-500', label: 'Section' };
    case 'content':
      return { icon: <BookOpen className="h-3 w-3" />, color: 'bg-blue-500', label: 'Content' };
    case 'takeaway':
      return { icon: <Lightbulb className="h-3 w-3" />, color: 'bg-amber-500', label: 'Takeaway' };
    case 'comparison':
      return { icon: <GitCompare className="h-3 w-3" />, color: 'bg-purple-500', label: 'Comparison' };
    case 'timeline':
      return { icon: <Clock className="h-3 w-3" />, color: 'bg-emerald-500', label: 'Timeline' };
    case 'mindmap':
      return { icon: <Network className="h-3 w-3" />, color: 'bg-pink-500', label: 'Mind Map' };
    default:
      return { icon: <Target className="h-3 w-3" />, color: 'bg-gray-500', label: 'Slide' };
  }
}

// Get short title for slide
function getSlideTitle(slide: Slide): string {
  switch (slide.type) {
    case 'title':
      return slide.subtitle || slide.title;
    case 'section':
    case 'content':
    case 'takeaway':
    case 'comparison':
    case 'timeline':
    case 'mindmap':
      return slide.title;
    default:
      return `Slide`;
  }
}

export function SlideMiniNavigator({ slides, currentSlideIndex, onGoToSlide }: SlideMiniNavigatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Group slides by sections
  const sections: { sectionIndex: number; sectionTitle: string; slides: { index: number; slide: Slide }[] }[] = [];
  let currentSection = { sectionIndex: 0, sectionTitle: 'Introduction', slides: [] as { index: number; slide: Slide }[] };

  slides.forEach((slide, index) => {
    if (slide.type === 'section') {
      if (currentSection.slides.length > 0) {
        sections.push(currentSection);
      }
      currentSection = { sectionIndex: sections.length, sectionTitle: slide.title, slides: [] };
    }
    currentSection.slides.push({ index, slide });
  });
  if (currentSection.slides.length > 0) {
    sections.push(currentSection);
  }

  // Find current section
  const currentSectionIndex = sections.findIndex(section =>
    section.slides.some(s => s.index === currentSlideIndex)
  );

  return (
    <div ref={containerRef} className="fixed left-4 bottom-24 z-40 md:left-8">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-border bg-card/95 px-3 py-2',
          'text-sm font-medium shadow-lg backdrop-blur-sm transition-all',
          'hover:bg-muted hover:shadow-xl',
          isExpanded && 'bg-muted'
        )}
        whileTap={{ scale: 0.98 }}
      >
        <Layers className="h-4 w-4 text-teal-500" />
        <span className="text-muted-foreground">
          {currentSlideIndex + 1}/{slides.length}
        </span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        )}
      </motion.button>

      {/* Expanded Navigator Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute bottom-full left-0 mb-2 w-72',
              'rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur-sm',
              'max-h-[60vh] overflow-y-auto'
            )}
          >
            <div className="p-3">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quick Navigation
              </h3>

              {/* Sections */}
              <div className="space-y-2">
                {sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="space-y-1">
                    {/* Section Header */}
                    <div className={cn(
                      'flex items-center gap-2 rounded-lg px-2 py-1.5',
                      currentSectionIndex === sectionIdx && 'bg-teal-50 dark:bg-teal-900/30'
                    )}>
                      <div className="h-2 w-2 rounded-full bg-teal-500" />
                      <span className={cn(
                        'text-xs font-medium',
                        currentSectionIndex === sectionIdx ? 'text-teal-700 dark:text-teal-400' : 'text-muted-foreground'
                      )}>
                        {section.sectionTitle}
                      </span>
                    </div>

                    {/* Slides in Section */}
                    <div className="ml-3 space-y-0.5">
                      {section.slides.map(({ index, slide }) => {
                        const typeInfo = getSlideTypeInfo(slide);
                        const isCurrent = index === currentSlideIndex;
                        const title = getSlideTitle(slide);

                        return (
                          <button
                            key={index}
                            onClick={() => {
                              onGoToSlide(index);
                              setIsExpanded(false);
                            }}
                            className={cn(
                              'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors',
                              isCurrent
                                ? 'bg-gradient-to-r from-coral-50 to-teal-50 dark:from-coral-900/30 dark:to-teal-900/30 border border-teal-200 dark:border-teal-800'
                                : 'hover:bg-muted'
                            )}
                          >
                            <div className={cn(
                              'flex h-5 w-5 items-center justify-center rounded text-white',
                              typeInfo.color
                            )}>
                              {typeInfo.icon}
                            </div>
                            <span className={cn(
                              'flex-1 truncate text-xs',
                              isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground'
                            )}>
                              {title}
                            </span>
                            <span className={cn(
                              'text-[10px] tabular-nums',
                              isCurrent ? 'font-semibold text-teal-600' : 'text-muted-foreground/60'
                            )}>
                              {index + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Keyboard Shortcuts Hint */}
              <div className="mt-3 border-t border-border pt-3">
                <p className="text-[10px] text-muted-foreground">
                  <kbd className="rounded bg-muted px-1 font-mono">Home</kbd> First slide •{' '}
                  <kbd className="rounded bg-muted px-1 font-mono">End</kbd> Last slide
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
