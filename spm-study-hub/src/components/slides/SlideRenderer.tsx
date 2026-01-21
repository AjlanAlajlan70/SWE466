'use client';

import { Slide } from '@/data/chapters/types';
import { TitleSlide } from './TitleSlide';
import { SectionSlide } from './SectionSlide';
import { ContentSlide } from './ContentSlide';
import { TakeawaySlide } from './TakeawaySlide';
import { ComparisonSlide } from './ComparisonSlide';
import { TimelineSlide } from './TimelineSlide';
import { MindmapSlide } from './MindmapSlide';

interface SlideRendererProps {
  slide: Slide;
  visibleSteps: number;
}

export function SlideRenderer({ slide, visibleSteps }: SlideRendererProps) {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} />;
    case 'section':
      return <SectionSlide slide={slide} />;
    case 'content':
      return <ContentSlide slide={slide} visibleSteps={visibleSteps} />;
    case 'takeaway':
      return <TakeawaySlide slide={slide} visibleSteps={visibleSteps} />;
    case 'comparison':
      return <ComparisonSlide slide={slide} visibleSteps={visibleSteps} />;
    case 'timeline':
      return <TimelineSlide slide={slide} visibleSteps={visibleSteps} />;
    case 'mindmap':
      return <MindmapSlide slide={slide} visibleSteps={visibleSteps} />;
    default:
      return (
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          Unknown slide type
        </div>
      );
  }
}
