'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import {
  ContentSlide as ContentSlideType,
  ContentItem,
} from '@/data/chapters/types';
import { stepVariants, staggerContainer } from '@/lib/animations';
import { IconBox } from '@/components/ui/IconBox';
import { parseBoldText } from '@/lib/utils';

interface ContentSlideProps {
  slide: ContentSlideType;
  visibleSteps: number;
}

// Render text with bold markdown syntax
function RenderText({ text }: { text: string }) {
  const parts = parseBoldText(text);
  return (
    <>
      {parts.map((part, index) =>
        part.bold ? (
          <strong key={index} className="font-semibold text-foreground">
            {part.text}
          </strong>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </>
  );
}

// Render a single content item
function ContentItemRenderer({
  item,
  isVisible,
}: {
  item: ContentItem;
  isVisible: boolean;
}) {
  if (!isVisible) return null;

  switch (item.type) {
    case 'text':
      return (
        <motion.p
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          className="text-muted-foreground"
        >
          <RenderText text={item.content} />
        </motion.p>
      );

    case 'bullet':
      return (
        <motion.ul
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {item.items.map((bullet, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral-500" />
              <span className="text-muted-foreground">
                <RenderText text={bullet} />
              </span>
            </li>
          ))}
        </motion.ul>
      );

    case 'definition':
      return (
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          className="rounded-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/30 p-4"
        >
          <p className="font-semibold text-teal-800 dark:text-teal-300">{item.term}</p>
          <p className="mt-1 text-teal-700 dark:text-teal-400">{item.definition}</p>
        </motion.div>
      );

    case 'highlight':
      return (
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 p-4"
        >
          <span className="text-2xl">{item.icon || <Lightbulb className="h-6 w-6 text-amber-600" />}</span>
          <p className="text-amber-800 dark:text-amber-300">
            <RenderText text={item.content} />
          </p>
        </motion.div>
      );

    case 'warning':
      return (
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          className="flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-900/30 p-4"
        >
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
          <p className="text-red-800 dark:text-red-300">
            <RenderText text={item.content} />
          </p>
        </motion.div>
      );

    case 'table':
      return (
        <motion.div
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                {item.headers.map((header, index) => (
                  <th
                    key={index}
                    className="p-3 text-left font-semibold text-foreground"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-border/50">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-3 text-muted-foreground"
                    >
                      <RenderText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      );

    default:
      return null;
  }
}

export function ContentSlide({ slide, visibleSteps }: ContentSlideProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl"
    >
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <IconBox size="lg" variant="coral">
          {slide.icon}
        </IconBox>
        <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground md:text-3xl">
          {slide.title}
        </h2>
      </div>

      {/* Content Items */}
      <div className="space-y-6">
        {slide.content.map((item, index) => (
          <ContentItemRenderer
            key={index}
            item={item}
            isVisible={index < visibleSteps}
          />
        ))}
      </div>
    </motion.div>
  );
}
