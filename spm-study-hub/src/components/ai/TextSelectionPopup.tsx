'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextSelectionPopupProps {
  onAskAI: (text: string) => void;
}

export function TextSelectionPopup({ onAskAI }: TextSelectionPopupProps) {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseUp = useCallback((event: MouseEvent) => {
    // Ignore selections inside the AI sidebar
    const target = event.target as HTMLElement;
    if (target.closest('[data-ai-sidebar]')) {
      return;
    }

    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && text.length > 3 && text.length < 500) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();

      if (rect) {
        // Position the popup above the selection
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10,
        });
        setSelectedText(text);
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
      setSelectedText('');
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    // Hide popup when starting a new selection
    setIsVisible(false);
  }, []);

  const handleAskAI = useCallback(() => {
    if (selectedText) {
      onAskAI(`Explain this: "${selectedText}"`);
      setIsVisible(false);
      setSelectedText('');
      // Clear the selection
      window.getSelection()?.removeAllRanges();
    }
  }, [selectedText, onAskAI]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

  // Hide on scroll
  useEffect(() => {
    const handleScroll = () => setIsVisible(false);
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -100%)',
            zIndex: 100,
          }}
        >
          <button
            onClick={handleAskAI}
            className={cn(
              'flex items-center gap-2 rounded-full',
              'bg-gradient-to-r from-coral-500 to-teal-500 text-white',
              'px-4 py-2 text-sm font-medium shadow-lg',
              'hover:shadow-xl hover:scale-105 transition-all',
              'focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
            )}
          >
            <Sparkles className="h-4 w-4" />
            Ask AI
          </button>
          {/* Arrow pointer */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #14b8a6',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
