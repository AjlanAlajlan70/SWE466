// Slide Types
export type SlideType = 'title' | 'section' | 'content' | 'takeaway' | 'comparison' | 'timeline' | 'mindmap';

// Content Item Types for Content Slides
export type ContentItemType = 'text' | 'bullet' | 'definition' | 'highlight' | 'warning' | 'table';

export interface TextContent {
  type: 'text';
  content: string;
}

export interface BulletContent {
  type: 'bullet';
  items: string[];
}

export interface DefinitionContent {
  type: 'definition';
  term: string;
  definition: string;
}

export interface HighlightContent {
  type: 'highlight';
  icon: string;
  content: string;
}

export interface WarningContent {
  type: 'warning';
  content: string;
}

export interface TableContent {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export type ContentItem =
  | TextContent
  | BulletContent
  | DefinitionContent
  | HighlightContent
  | WarningContent
  | TableContent;

// Base Slide Interface
interface BaseSlide {
  id: string;
  type: SlideType;
}

// Title Slide
export interface TitleSlide extends BaseSlide {
  type: 'title';
  chapterNumber: number;
  title: string;
  subtitle: string;
  objective: string;
}

// Section Slide
export interface SectionSlide extends BaseSlide {
  type: 'section';
  sectionNumber: number;
  title: string;
}

// Content Slide
export interface ContentSlide extends BaseSlide {
  type: 'content';
  icon: string;
  title: string;
  content: ContentItem[];
}

// Takeaway Point
export interface TakeawayPoint {
  icon: string;
  title: string;
  description: string;
}

// Takeaway Slide
export interface TakeawaySlide extends BaseSlide {
  type: 'takeaway';
  title: string;
  points: [TakeawayPoint, TakeawayPoint, TakeawayPoint, TakeawayPoint];
}

// Comparison Column
export interface ComparisonColumn {
  title: string;
  items: string[];
}

// Comparison Slide
export interface ComparisonSlide extends BaseSlide {
  type: 'comparison';
  title: string;
  leftColumn: ComparisonColumn;
  rightColumn: ComparisonColumn;
}

// Timeline Event
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

// Timeline Slide
export interface TimelineSlide extends BaseSlide {
  type: 'timeline';
  title: string;
  events: TimelineEvent[];
}

// Mind Map Branch
export interface MindmapBranch {
  label: string;
  items: string[];
}

// Mind Map Slide
export interface MindmapSlide extends BaseSlide {
  type: 'mindmap';
  title: string;
  centerLabel: string;
  branches: MindmapBranch[];
}

// Union of all slide types
export type Slide =
  | TitleSlide
  | SectionSlide
  | ContentSlide
  | TakeawaySlide
  | ComparisonSlide
  | TimelineSlide
  | MindmapSlide;

// Quiz Question Types
export interface MCQQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingQuestion {
  id: string;
  instruction: string;
  pairs: MatchingPair[];
  explanation: string;
}

export interface FillBlankQuestion {
  id: string;
  question: string; // Use ___ for blank
  acceptableAnswers: string[];
  explanation: string;
}

// Quiz Structure
export interface Quiz {
  mcq: MCQQuestion[];
  trueFalse: TrueFalseQuestion[];
  matching: MatchingQuestion[];
  fillBlank: FillBlankQuestion[];
}

// Chapter Structure
export interface Chapter {
  id: string;
  slug: string;
  chapterNumber: number;
  title: string;
  description: string;
  icon: string;
  slides: Slide[];
  quiz: Quiz;
}

// Progress Types
export interface SlideProgress {
  slideIndex: number;
  stepIndex: number;
  completed: boolean;
}

export interface QuizScore {
  mcq: number;
  trueFalse: number;
  matching: number;
  fillBlank: number;
  total: number;
  percentage: number;
  completedAt: string;
}

export interface ChapterProgress {
  chapterId: string;
  slidesCompleted: boolean;
  currentSlide: number;
  currentStep: number;
  quizScore?: QuizScore;
  lastAccessedAt: string;
}

export interface UserProgress {
  chapters: Record<string, ChapterProgress>;
}
