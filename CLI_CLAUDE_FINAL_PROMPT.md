# 🎯 SPM Study Hub — Complete Build Specification

## Project Overview

Build an **interactive study platform** for Software Project Management that is:
- Beautiful with smooth animations
- Easy to add new chapters (data-driven)
- Has smart quizzes that test understanding
- Shareable with peers
- Deployable on Vercel

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** | App Router, React Server Components |
| **TypeScript** | Type safety, better DX |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Groq API** | AI assistant (free) |
| **Vercel** | Deployment |

---

## Project Structure

```
spm-study-hub/
├── .env.example
├── .gitignore
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
│
├── docs/                              # 📚 IMPORTANT: Reference docs
│   ├── SLIDE_RULES.md
│   ├── QUIZ_RULES.md
│   └── CHAPTER_TEMPLATE.md
│
├── public/
│   └── fonts/                         # If self-hosting fonts
│
└── src/
    ├── app/
    │   ├── layout.tsx                 # Root layout with fonts
    │   ├── page.tsx                   # Landing page (chapter list)
    │   ├── globals.css                # Global styles + CSS variables
    │   │
    │   ├── chapter/
    │   │   └── [slug]/
    │   │       ├── page.tsx           # Slides view
    │   │       └── quiz/
    │   │           └── page.tsx       # Quiz page
    │   │
    │   └── api/
    │       └── ai/
    │           └── route.ts           # Groq API proxy
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   │
    │   ├── home/
    │   │   ├── ChapterCard.tsx
    │   │   └── HeroSection.tsx
    │   │
    │   ├── slides/
    │   │   ├── SlideContainer.tsx     # Main slide wrapper + navigation
    │   │   ├── SlideRenderer.tsx      # Renders correct slide type
    │   │   ├── TitleSlide.tsx
    │   │   ├── SectionDivider.tsx
    │   │   ├── ContentSlide.tsx
    │   │   ├── TakeawaySlide.tsx
    │   │   ├── ProgressBar.tsx
    │   │   ├── SlideNavigation.tsx
    │   │   └── StepIndicator.tsx
    │   │
    │   ├── quiz/
    │   │   ├── QuizContainer.tsx
    │   │   ├── QuizProgress.tsx
    │   │   ├── MCQCard.tsx
    │   │   ├── TrueFalseCard.tsx
    │   │   ├── MatchingCard.tsx
    │   │   ├── FillBlankCard.tsx
    │   │   ├── QuizResults.tsx
    │   │   └── ExplanationModal.tsx
    │   │
    │   ├── ai/
    │   │   └── AIAssistant.tsx        # Floating AI chat
    │   │
    │   └── ui/
    │       ├── AnimatedCard.tsx
    │       ├── GradientBox.tsx
    │       ├── IconBox.tsx
    │       ├── Button.tsx
    │       └── Modal.tsx
    │
    ├── data/
    │   └── chapters/
    │       ├── types.ts               # TypeScript interfaces
    │       ├── index.ts               # Exports all chapters
    │       └── chapter1.ts            # Chapter 1 content + quiz
    │
    ├── hooks/
    │   ├── useSlideNavigation.ts
    │   ├── useQuizState.ts
    │   ├── useLocalStorage.ts
    │   └── useProgress.ts
    │
    └── lib/
        ├── utils.ts
        └── groq.ts                    # Groq client
```

---

## Design System

### Fonts (Google Fonts)

```tsx
// src/app/layout.tsx
import { Outfit, Instrument_Serif, JetBrains_Mono } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const instrumentSerif = Instrument_Serif({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-serif' 
})
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
})
```

### CSS Variables

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Backgrounds */
  --bg-primary: #faf9f7;
  --bg-secondary: #f0eeeb;
  
  /* Text */
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-muted: #7a7a7a;
  
  /* Accents */
  --accent-blue: #2c5aa0;
  --accent-coral: #e85d4c;
  --accent-gold: #c9a227;
  --accent-teal: #1a7f7a;
  --accent-purple: #6b4c9a;
  
  /* Gradients */
  --gradient-warm: linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fde68a 100%);
  --gradient-cool: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%);
  --gradient-coral: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #fecdd3 100%);
  --gradient-teal: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #99f6e4 100%);
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.08);
}

body {
  font-family: var(--font-outfit), sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
}

h1, h2, h3, h4 {
  font-family: var(--font-serif), serif;
}

code, .mono {
  font-family: var(--font-mono), monospace;
}
```

### Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#faf9f7',
        'bg-secondary': '#f0eeeb',
        'text-primary': '#1a1a1a',
        'text-secondary': '#4a4a4a',
        'text-muted': '#7a7a7a',
        'accent-blue': '#2c5aa0',
        'accent-coral': '#e85d4c',
        'accent-gold': '#c9a227',
        'accent-teal': '#1a7f7a',
        'accent-purple': '#6b4c9a',
      },
      fontFamily: {
        sans: ['var(--font-outfit)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.04)',
        'md': '0 4px 12px rgba(0,0,0,0.06)',
        'lg': '0 12px 40px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## TypeScript Interfaces

```typescript
// src/data/chapters/types.ts

// ============ SLIDE TYPES ============

export type SlideType = 'title' | 'section' | 'content' | 'takeaway' | 'comparison' | 'timeline';

export interface BaseSlide {
  id: string;
  type: SlideType;
  notes?: string; // Optional speaker notes
}

export interface TitleSlide extends BaseSlide {
  type: 'title';
  chapterNumber: number;
  title: string;
  subtitle: string;
  learningObjective?: string;
}

export interface SectionSlide extends BaseSlide {
  type: 'section';
  sectionNumber: string; // "01", "02", etc.
  title: string;
  subtitle?: string;
  gradient?: 'cool' | 'warm' | 'coral' | 'teal';
}

export interface ContentItem {
  type: 'text' | 'bullet' | 'definition' | 'highlight' | 'warning' | 'table';
  content: string | string[] | TableData;
  emphasis?: boolean;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ContentSlide extends BaseSlide {
  type: 'content';
  icon: string; // Emoji
  title: string;
  tagline?: string;
  content: ContentItem[];
  columns?: 1 | 2 | 3;
  layout?: 'default' | 'cards' | 'split';
}

export interface TakeawayItem {
  icon: string;
  title: string;
  description: string;
  color?: 'blue' | 'coral' | 'teal' | 'gold';
}

export interface TakeawaySlide extends BaseSlide {
  type: 'takeaway';
  title?: string;
  items: TakeawayItem[];
  bottomNote?: string;
}

export interface ComparisonSlide extends BaseSlide {
  type: 'comparison';
  title: string;
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
}

export interface TimelineItem {
  label: string;
  description: string;
}

export interface TimelineSlide extends BaseSlide {
  type: 'timeline';
  title: string;
  items: TimelineItem[];
}

export type Slide = TitleSlide | SectionSlide | ContentSlide | TakeawaySlide | ComparisonSlide | TimelineSlide;

// ============ QUIZ TYPES ============

export interface MCQQuestion {
  id: string;
  question: string;
  options: [string, string, string, string]; // Exactly 4 options
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
}

export interface FillBlankQuestion {
  id: string;
  sentence: string; // Use _____ for blank
  answer: string;
  acceptableAnswers: string[];
  hint?: string;
}

export interface Quiz {
  mcq: MCQQuestion[];
  trueFalse: TrueFalseQuestion[];
  matching: MatchingQuestion[];
  fillBlank: FillBlankQuestion[];
}

// ============ CHAPTER TYPE ============

export interface Chapter {
  id: string;
  slug: string; // URL-friendly: "introduction-to-spm"
  chapterNumber: number;
  title: string;
  description: string;
  icon: string;
  slides: Slide[];
  quiz: Quiz;
}
```

---

## Chapter Registry (Auto-Discovery)

```typescript
// src/data/chapters/index.ts

import { Chapter } from './types';
import { chapter1 } from './chapter1';
// import { chapter2 } from './chapter2'; // Add as you create them

export const chapters: Chapter[] = [
  chapter1,
  // chapter2,  // Just add here when created!
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find(c => c.slug === slug);
}

export function getChapterByNumber(num: number): Chapter | undefined {
  return chapters.find(c => c.chapterNumber === num);
}
```

---

## Animation Variants (Framer Motion)

```typescript
// src/lib/animations.ts

export const slideVariants = {
  enter: {
    opacity: 0,
    x: 50,
  },
  center: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -50,
  },
};

export const stepVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // Custom easing
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  },
  hover: {
    y: -4,
    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
    transition: {
      duration: 0.2,
    },
  },
};
```

---

## AI Assistant Integration

```typescript
// src/app/api/ai/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { message, chapterContext } = await request.json();
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a helpful tutor for Software Project Management.
            Current chapter context: ${chapterContext}
            
            Guidelines:
            - Be concise but thorough
            - Use examples from the course material
            - If generating questions, follow these rules:
              - Test understanding, not memorization
              - No questions about authors, dates, or page numbers
              - Scenario-based questions are preferred
            - Be encouraging and supportive`
        },
        { role: 'user', content: message }
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });
  
  const data = await response.json();
  return NextResponse.json({ 
    response: data.choices[0].message.content 
  });
}
```

```typescript
// src/lib/groq.ts

export async function askAI(message: string, chapterContext: string) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, chapterContext }),
  });
  
  const data = await response.json();
  return data.response;
}
```

---

## Progress Tracking Hook

```typescript
// src/hooks/useProgress.ts

import { useLocalStorage } from './useLocalStorage';

interface ChapterProgress {
  slidesCompleted: boolean;
  quizScores: {
    mcq: number;
    trueFalse: number;
    matching: number;
    fillBlank: number;
  };
  lastAccessed: string;
  currentSlide: number;
}

interface Progress {
  [chapterSlug: string]: ChapterProgress;
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<Progress>('spm-progress', {});
  
  const updateSlideProgress = (slug: string, slideIndex: number) => {
    setProgress(prev => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        currentSlide: slideIndex,
        lastAccessed: new Date().toISOString(),
      },
    }));
  };
  
  const markSlidesComplete = (slug: string) => {
    setProgress(prev => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        slidesCompleted: true,
        lastAccessed: new Date().toISOString(),
      },
    }));
  };
  
  const saveQuizScore = (
    slug: string, 
    quizType: keyof ChapterProgress['quizScores'], 
    score: number
  ) => {
    setProgress(prev => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        quizScores: {
          ...prev[slug]?.quizScores,
          [quizType]: score,
        },
        lastAccessed: new Date().toISOString(),
      },
    }));
  };
  
  const getChapterProgress = (slug: string) => progress[slug];
  
  return {
    progress,
    updateSlideProgress,
    markSlidesComplete,
    saveQuizScore,
    getChapterProgress,
  };
}
```

---

## Environment Variables

```bash
# .env.example
GROQ_API_KEY=your_groq_api_key_here
```

```bash
# .env.local (create this, don't commit)
GROQ_API_KEY=gsk_xxxxxxxxxxxxx
```

---

# 📚 DOCS FOLDER CONTENTS

Create these files in the `docs/` folder:

---

## docs/SLIDE_RULES.md

```markdown
# 📐 Slide Design Rules

## Typography
- **Headings**: Instrument Serif (font-serif)
- **Body**: Outfit (font-sans)
- **Code**: JetBrains Mono (font-mono)

## Color Usage
| Color | Use For |
|-------|---------|
| accent-blue | Primary actions, links, first items |
| accent-coral | Warnings, important highlights |
| accent-gold | Tips, insights, highlights |
| accent-teal | Success, positive items |

## Slide Types

### 1. TitleSlide
- Use for: Chapter opening
- Required: chapterNumber, title, subtitle
- Optional: learningObjective

### 2. SectionSlide
- Use for: Major topic transitions
- Required: sectionNumber (2 digits: "01"), title
- Optional: subtitle, gradient
- The section number appears large and faded (10% opacity)

### 3. ContentSlide
- Use for: Main content delivery
- Required: icon, title, content array
- Optional: tagline, columns (1-3), layout
- Maximum 6 bullet points per slide
- Each bullet should be substantial (1-2 sentences)

### 4. TakeawaySlide
- Use for: Chapter summaries, key points
- Required: items array (exactly 4 items)
- Each item needs: icon, title, description
- Colors alternate: blue, coral, teal, gold

## Content Guidelines

### DO ✅
- Preserve 100% of original slide content
- Use icons for visual hierarchy
- Break long content into multiple slides
- Use tables for comparisons
- Add taglines to provide context

### DON'T ❌
- Summarize away important details
- Use more than 6 bullets per slide
- Skip the icon on content slides
- Make up information not in source
- Use walls of text

## Animation Rules
- All content items are "steps" that reveal one by one
- Steps animate: opacity 0→1, translateY 20px→0
- Timing: 0.5s with easing [0.16, 1, 0.3, 1]
- User advances with → / Space / Click

## Responsive Behavior
- Desktop: Full presentation mode
- Tablet: Slightly reduced padding
- Mobile: Single column, stacked layout
```

---

## docs/QUIZ_RULES.md

```markdown
# 📝 Quiz Question Rules

## AUTOMATIC FAILURES ❌

These questions should NEVER exist:

1. **Trivia Questions**
   - ❌ "Who wrote 'Essence and Accidents'?"
   - ❌ "In what year was PMBOK 4th edition published?"
   - ❌ "What is the ISBN of the textbook?"

2. **Slide References**
   - ❌ "According to slide 5..."
   - ❌ "The textbook states on page 12..."

3. **Acronym Expansion**
   - ❌ "What does PMBOK stand for?"
   - ❌ "What does the S in SMART mean?"
   
4. **Ambiguous Questions**
   - ❌ Questions with multiple defensible answers
   - ❌ "Which is the BEST..." without clear criteria

5. **Trick Questions**
   - ❌ Double negatives
   - ❌ "All of the above EXCEPT..."

## REQUIRED QUALITIES ✅

Every question MUST:

1. **Test Understanding**
   - ✅ "Your project is behind schedule. According to the Triple Constraint, what are your options?"
   
2. **Be Scenario-Based (MCQ)**
   - ✅ Present realistic situations
   - ✅ Ask what would happen or what to do
   
3. **Have ONE Correct Answer**
   - ✅ Clearly defensible
   - ✅ Other options are plausible but wrong
   
4. **Include Valuable Explanations**
   - ✅ Explain WHY the answer is correct
   - ✅ Teach something new
   - ✅ Reference course concepts

## Question Type Guidelines

### MCQ (Multiple Choice)
\`\`\`typescript
{
  id: "ch1-mcq-1",
  question: "Scenario or conceptual question here?",
  options: [
    "Plausible but wrong",
    "Correct answer",
    "Another plausible wrong answer",
    "Fourth plausible wrong answer"
  ],
  correctIndex: 1, // 0-3
  explanation: "Why this is correct and others are wrong..."
}
\`\`\`

**Rules:**
- Exactly 4 options
- Randomize correct position
- All distractors must be plausible
- Scenario-based preferred

### True/False
\`\`\`typescript
{
  id: "ch1-tf-1",
  statement: "Clear statement that is definitively true or false.",
  isTrue: false,
  explanation: "Why this is false and what's actually true..."
}
\`\`\`

**Rules:**
- Statement must be CLEARLY true or false
- Avoid "always" / "never" (easy to guess false)
- Test common misconceptions
- Explanation should teach the correct concept

### Matching
\`\`\`typescript
{
  id: "ch1-match-1",
  instruction: "Match each concept with its REAL-WORLD challenge:",
  pairs: [
    { left: "Concept A", right: "Application/Challenge A" },
    { left: "Concept B", right: "Application/Challenge B" },
  ]
}
\`\`\`

**Rules:**
- 4-5 pairs per question
- Right side should be APPLICATIONS or EXAMPLES
- NOT just matching terms to definitions
- Should require understanding, not memorization

### Fill-in-the-Blank
\`\`\`typescript
{
  id: "ch1-fill-1",
  sentence: "The _____ constraint involves balancing scope, time, and cost.",
  answer: "Triple",
  acceptableAnswers: ["Triple", "triple", "TRIPLE"]
}
\`\`\`

**Rules:**
- Blank should be a KEY concept
- Not obscure details
- Include case variations in acceptableAnswers
- One blank per question

## Quality Checklist

Before adding any question, verify:

- [ ] Would a student learn something by getting it wrong?
- [ ] Is there exactly ONE defensible correct answer?
- [ ] Does the explanation add value?
- [ ] Is it free from trivia/memorization?
- [ ] Would you be confident defending this answer?
- [ ] Does it relate to a KEY concept?
```

---

## docs/CHAPTER_TEMPLATE.md

```markdown
# 📖 Adding a New Chapter

## Quick Start

1. Create file: \`src/data/chapters/chapter[N].ts\`
2. Copy template below
3. Fill in content from slides
4. Add to \`index.ts\`
5. Done!

## Template

\`\`\`typescript
import { Chapter } from './types';

export const chapter[N]: Chapter = {
  id: 'chapter-[N]',
  slug: '[url-friendly-name]',  // e.g., 'project-planning'
  chapterNumber: [N],
  title: '[Chapter Title]',
  description: '[Brief description for card]',
  icon: '[emoji]',
  
  slides: [
    // TITLE SLIDE (always first)
    {
      id: 'ch[N]-title',
      type: 'title',
      chapterNumber: [N],
      title: '[Chapter Title]',
      subtitle: '[Subtitle from slides]',
      learningObjective: '[Optional objective]',
    },
    
    // SECTION DIVIDER
    {
      id: 'ch[N]-section-01',
      type: 'section',
      sectionNumber: '01',
      title: '[Section Title]',
      subtitle: '[Optional subtitle]',
      gradient: 'cool', // 'cool' | 'warm' | 'coral' | 'teal'
    },
    
    // CONTENT SLIDE
    {
      id: 'ch[N]-content-01',
      type: 'content',
      icon: '📋',
      title: '[Slide Title]',
      tagline: '[Optional context line]',
      content: [
        {
          type: 'text',
          content: 'Regular paragraph text here.'
        },
        {
          type: 'bullet',
          content: [
            '**Bold term** — explanation here',
            'Another point with details',
          ]
        },
        {
          type: 'highlight',
          content: '💡 Important insight or tip'
        },
        {
          type: 'warning',
          content: '⚠️ Critical point to remember'
        },
        {
          type: 'table',
          content: {
            headers: ['Column 1', 'Column 2'],
            rows: [
              ['Cell 1', 'Cell 2'],
              ['Cell 3', 'Cell 4'],
            ]
          }
        }
      ]
    },
    
    // TAKEAWAY SLIDE (usually last)
    {
      id: 'ch[N]-takeaway',
      type: 'takeaway',
      items: [
        {
          icon: '🎯',
          title: 'Key Point 1',
          description: 'Brief explanation',
          color: 'blue'
        },
        {
          icon: '💡',
          title: 'Key Point 2',
          description: 'Brief explanation',
          color: 'coral'
        },
        {
          icon: '⚡',
          title: 'Key Point 3',
          description: 'Brief explanation',
          color: 'teal'
        },
        {
          icon: '🚀',
          title: 'Key Point 4',
          description: 'Brief explanation',
          color: 'gold'
        }
      ]
    }
  ],
  
  quiz: {
    mcq: [
      // 8-10 questions
    ],
    trueFalse: [
      // 8-10 questions
    ],
    matching: [
      // 4-5 questions
    ],
    fillBlank: [
      // 5-6 questions
    ]
  }
};
\`\`\`

## Register the Chapter

\`\`\`typescript
// src/data/chapters/index.ts

import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';  // Add import

export const chapters: Chapter[] = [
  chapter1,
  chapter2,  // Add to array
];
\`\`\`

## Checklist

- [ ] All original slide content preserved
- [ ] Slides follow SLIDE_RULES.md
- [ ] Quiz follows QUIZ_RULES.md
- [ ] Added to index.ts
- [ ] Tested locally
- [ ] Ready for validation
```

---

# 📦 CHAPTER 1 COMPLETE DATA

```typescript
// src/data/chapters/chapter1.ts

import { Chapter } from './types';

export const chapter1: Chapter = {
  id: 'chapter-1',
  slug: 'introduction-to-spm',
  chapterNumber: 1,
  title: 'Introduction to Software Project Management',
  description: 'Understand the basics of software project management, including key definitions, stakeholders, and project constraints.',
  icon: '🚀',
  
  slides: [
    // ========== TITLE ==========
    {
      id: 'ch1-title',
      type: 'title',
      chapterNumber: 1,
      title: 'Introduction to Software Project Management',
      subtitle: 'Chapter 1',
      learningObjective: 'Understand the basics of software project management',
    },
    
    // ========== OUTLINE ==========
    {
      id: 'ch1-outline',
      type: 'content',
      icon: '📑',
      title: 'What We\'ll Cover',
      tagline: 'Your roadmap for this chapter',
      content: [
        {
          type: 'bullet',
          content: [
            'What is a project? (Definitions from PMBOK & ISO)',
            'Jobs vs. Projects — understanding the spectrum',
            'Characteristics that make tasks "project-like"',
            'How software projects differ from others',
            'Stakeholders — who matters and why',
            'Management activities and project management',
            'The software development life-cycle (ISO 12207)',
            'SMART objectives and project constraints',
            'Defining project success',
          ]
        }
      ]
    },
    
    // ========== SECTION 1: WHAT IS A PROJECT ==========
    {
      id: 'ch1-section-01',
      type: 'section',
      sectionNumber: '01',
      title: 'What is a Project?',
      subtitle: 'Definitions and key concepts',
      gradient: 'cool',
    },
    
    {
      id: 'ch1-project-definition',
      type: 'content',
      icon: '📖',
      title: 'What is a Project?',
      tagline: 'Three perspectives on the same concept',
      content: [
        {
          type: 'definition',
          content: '**Dictionary**: "A specific plan or design", "A planned undertaking", "A large undertaking e.g. a public works scheme"'
        },
        {
          type: 'highlight',
          content: '💡 Key elements: **Planning** (determining how before starting) and **Size of task**'
        }
      ]
    },
    
    {
      id: 'ch1-pmbok-definition',
      type: 'content',
      icon: '📘',
      title: 'PMBOK® Guide Definition',
      content: [
        {
          type: 'definition',
          content: '"A **temporary endeavor** undertaken to create a **unique product, service, or result**."'
        },
        {
          type: 'highlight',
          content: '⏰ The temporary nature indicates a **definite beginning AND end**'
        }
      ]
    },
    
    {
      id: 'ch1-iso-definition',
      type: 'content',
      icon: '🏛️',
      title: 'ISO 10006 Definition',
      content: [
        {
          type: 'definition',
          content: '"**Unique process**, consisting of a set of **coordinated and controlled activities** with start and finish dates, undertaken to achieve an objective conforming to specific requirements, including **constraints of time, cost and resources**."'
        }
      ]
    },
    
    // ========== SECTION 2: JOBS VS PROJECTS ==========
    {
      id: 'ch1-section-02',
      type: 'section',
      sectionNumber: '02',
      title: 'Jobs vs Projects',
      subtitle: 'Understanding the spectrum of work',
      gradient: 'warm',
    },
    
    {
      id: 'ch1-jobs-vs-projects',
      type: 'content',
      icon: '⚖️',
      title: 'The Work Spectrum',
      tagline: 'From routine to uncertain',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Type', 'Characteristics', 'Examples'],
            rows: [
              ['Jobs', 'Well-defined, well-understood, very little uncertainty', 'Replacing a car tyre, routine maintenance, standard lectures'],
              ['Projects', 'Well-defined hoped-for outcomes, but with risks and uncertainties', 'Software development, construction projects'],
              ['Exploration', 'Outcome is very uncertain', 'Finding a cure for cancer, research projects'],
            ]
          }
        },
        {
          type: 'highlight',
          content: '💡 Projects sit in the middle — more uncertain than jobs, but more defined than exploration'
        }
      ]
    },
    
    // ========== SECTION 3: CHARACTERISTICS ==========
    {
      id: 'ch1-section-03',
      type: 'section',
      sectionNumber: '03',
      title: 'Characteristics of Projects',
      subtitle: 'What makes something a project?',
      gradient: 'coral',
    },
    
    {
      id: 'ch1-characteristics',
      type: 'content',
      icon: '✨',
      title: '9 Project Characteristics',
      tagline: 'A task is more "project-like" if it is...',
      content: [
        {
          type: 'bullet',
          content: [
            '**Non-routine** — not a regular, repeated activity',
            '**Planned** — requires forethought and scheduling',
            '**Aiming at a specific target** — clear end goal',
            '**Carried out for a customer** — serves stakeholder needs',
            '**Carried out by a temporary work group** — team disbands after',
            '**Involving several specialisms** — multidisciplinary team',
            '**Made up of several different phases** — distinct stages',
            '**Constrained by time and resources** — limited budget/schedule',
            '**Large and/or complex** — significant scale',
          ]
        },
        {
          type: 'warning',
          content: '⚠️ The MORE of these factors apply, the MORE DIFFICULT the task will be'
        }
      ]
    },
    
    // ========== SECTION 4: SOFTWARE DIFFERENCES ==========
    {
      id: 'ch1-section-04',
      type: 'section',
      sectionNumber: '04',
      title: 'How Software Projects Are Different',
      subtitle: 'Brooks\' four essential challenges',
      gradient: 'teal',
    },
    
    {
      id: 'ch1-brooks-factors',
      type: 'content',
      icon: '💻',
      title: 'Brooks\' Four Factors',
      tagline: '"Essence and Accidents of Software Engineering" (1986)',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Factor', 'Description', 'Challenge'],
            rows: [
              ['Invisibility', 'Software is invisible & intangible', 'Can\'t physically see progress'],
              ['Complexity', 'No two parts are alike; more complex for its size than any other human construct', 'Hard to estimate, easy to miss dependencies'],
              ['Conformity', 'Must conform to requirements of human clients', 'Requirements often unclear, change frequently'],
              ['Flexibility', 'Subject to a high degree of change', 'Scope creep, constant modifications'],
            ]
          }
        }
      ]
    },
    
    // ========== SECTION 5: STAKEHOLDERS ==========
    {
      id: 'ch1-section-05',
      type: 'section',
      sectionNumber: '05',
      title: 'Stakeholders',
      subtitle: 'Who has a stake in your project?',
      gradient: 'cool',
    },
    
    {
      id: 'ch1-stakeholders-intro',
      type: 'content',
      icon: '👥',
      title: 'Who Are Stakeholders?',
      tagline: 'People involved in or affected by project activities',
      content: [
        {
          type: 'definition',
          content: '**Stakeholders** are people who have a stake or interest in the project — users/clients, developers/designers, project/product managers'
        },
        {
          type: 'bullet',
          content: [
            '**Within the project team** — developers, designers, analysts',
            '**Outside team, within organization** — other departments, management',
            '**Outside the organization** — customers, users, suppliers, opponents',
          ]
        }
      ]
    },
    
    {
      id: 'ch1-stakeholders-list',
      type: 'content',
      icon: '📋',
      title: 'Common Stakeholder Types',
      content: [
        {
          type: 'bullet',
          content: [
            'Project sponsor',
            'Project manager',
            'Project team',
            'Support staff',
            'Customers',
            'Users',
            'Suppliers',
            'Opponents to the project',
          ]
        },
        {
          type: 'warning',
          content: '⚠️ Different stakeholders may have DIFFERENT objectives — project leader must define COMMON objectives'
        },
        {
          type: 'highlight',
          content: '💡 Identify stakeholders AS EARLY AS POSSIBLE to establish communication channels from the start'
        }
      ]
    },
    
    // ========== SECTION 6: MANAGEMENT ==========
    {
      id: 'ch1-section-06',
      type: 'section',
      sectionNumber: '06',
      title: 'Management & Project Management',
      subtitle: 'The core activities',
      gradient: 'warm',
    },
    
    {
      id: 'ch1-management-activities',
      type: 'content',
      icon: '🎯',
      title: '8 Core Management Activities',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Activity', 'Description'],
            rows: [
              ['Planning', 'Deciding what\'s to be done'],
              ['Organizing', 'Making arrangements'],
              ['Staffing', 'Selecting the right people for the job'],
              ['Directing', 'Giving instructions, guidelines'],
              ['Monitoring', 'Checking on progress'],
              ['Controlling', 'Taking action to remedy hold-ups (delays)'],
              ['Innovating', 'Coming up with solutions when problems emerge'],
              ['Representing', 'Communicating with stakeholders'],
            ]
          }
        }
      ]
    },
    
    {
      id: 'ch1-pm-definition',
      type: 'content',
      icon: '📊',
      title: 'What is Project Management?',
      content: [
        {
          type: 'definition',
          content: '**Project Management**: The planning, scheduling and controlling of project activities to achieve project objectives.'
        },
        {
          type: 'definition',
          content: '**PMBOK® Guide**: "The application of knowledge, skills, tools and techniques to project activities to meet project requirements"'
        },
        {
          type: 'definition',
          content: '**Software Project Management**: The art and science of planning and leading software projects — a sub-discipline where software projects are planned, implemented, monitored and controlled.'
        }
      ]
    },
    
    {
      id: 'ch1-project-types',
      type: 'content',
      icon: '🏢',
      title: 'Types of Projects',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Type', 'Description'],
            rows: [
              ['In-house', 'Clients and developers employed by the SAME organization'],
              ['Out-sourced', 'Clients and developers employed by DIFFERENT organizations'],
            ]
          }
        }
      ]
    },
    
    {
      id: 'ch1-pm-activities',
      type: 'content',
      icon: '📈',
      title: 'Project Management Activities',
      tagline: 'The three main phases',
      content: [
        {
          type: 'bullet',
          content: [
            '**Feasibility Study** — Is the project technically feasible AND worthwhile from a business point of view?',
            '**Planning** — Only done IF the project is deemed feasible',
            '**Execution** — Implement the plan, but the plan may be changed as we go',
          ]
        }
      ]
    },
    
    {
      id: 'ch1-pm-advantages',
      type: 'content',
      icon: '✅',
      title: 'Advantages of Formal Project Management',
      tagline: '9 key benefits',
      content: [
        {
          type: 'bullet',
          content: [
            'Better control of financial, physical, and human resources',
            'Improved customer relations',
            'Shorter development times',
            'Lower costs',
            'Higher quality and increased reliability',
            'Higher profit margins',
            'Improved productivity',
            'Better internal coordination',
            'Higher worker confidence',
          ]
        }
      ]
    },
    
    // ========== SECTION 7: MANAGEMENT CONTROL ==========
    {
      id: 'ch1-section-07',
      type: 'section',
      sectionNumber: '07',
      title: 'Management Control',
      subtitle: 'The feedback loop',
      gradient: 'coral',
    },
    
    {
      id: 'ch1-control-cycle',
      type: 'content',
      icon: '🔄',
      title: 'The Management Control Cycle',
      content: [
        {
          type: 'bullet',
          content: [
            '**Real World** → Formless, chaotic',
            '**Data Collection** → Gather raw data (not very useful alone)',
            '**Data Processing** → Transform into meaningful information (e.g., percentages, estimates, averages)',
            '**Comparison with Objectives** → Measure against targets',
            '**Modeling** → Work out probable outcomes of decisions',
            '**Implementation** → Carry out remedial (corrective) actions',
          ]
        }
      ]
    },
    
    {
      id: 'ch1-data-vs-info',
      type: 'content',
      icon: '💡',
      title: 'Data vs Information',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Concept', 'Example'],
            rows: [
              ['Data (raw)', '"6,000 documents processed at location X"'],
              ['Information (processed)', '"Productivity is 100 documents per day"'],
            ]
          }
        },
        {
          type: 'highlight',
          content: '💡 A defective plan can often be REMEDIED by good project control and management'
        }
      ]
    },
    
    // ========== SECTION 8: SDLC ==========
    {
      id: 'ch1-section-08',
      type: 'section',
      sectionNumber: '08',
      title: 'Software Development Life-Cycle',
      subtitle: 'ISO 12207 phases',
      gradient: 'teal',
    },
    
    {
      id: 'ch1-sdlc',
      type: 'content',
      icon: '🔄',
      title: 'ISO 12207 Life-Cycle Phases',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Phase', 'Description'],
            rows: [
              ['1. Requirements Analysis', 'Elicitation (what client needs) + Analysis (convert to developer form). Covers: Functions, Quality, Resource constraints'],
              ['2. Architecture Design', 'Map requirements to system components. Defines: hardware, software, organizational components'],
              ['3. Code and Test', 'Development and testing of individual components'],
              ['4. Integration', 'Putting the components together'],
              ['5. Qualification Testing', 'Testing the SYSTEM (not just software)'],
              ['6. Installation', 'Making system operational — includes standing data, parameters, hardware setup, training'],
              ['7. Acceptance Support', 'Maintenance and enhancement'],
            ]
          }
        }
      ]
    },
    
    // ========== SECTION 9: SMART & CONSTRAINTS ==========
    {
      id: 'ch1-section-09',
      type: 'section',
      sectionNumber: '09',
      title: 'SMART Objectives & Constraints',
      subtitle: 'Setting and balancing goals',
      gradient: 'cool',
    },
    
    {
      id: 'ch1-smart',
      type: 'content',
      icon: '🎯',
      title: 'SMART Objectives',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Letter', 'Meaning', 'Description'],
            rows: [
              ['S', 'Specific', 'Concrete and well-defined'],
              ['M', 'Measurable', 'Can be objectively judged'],
              ['A', 'Achievable', 'Within power to meet the target'],
              ['R', 'Relevant', 'Related to project purpose; also Resource-constrained'],
              ['T', 'Time-constrained', 'Has a defined deadline'],
            ]
          }
        }
      ]
    },
    
    {
      id: 'ch1-triple-constraint',
      type: 'content',
      icon: '🔺',
      title: 'The Triple Constraint',
      tagline: 'The "Project Triangle"',
      content: [
        {
          type: 'text',
          content: 'Every project must balance three fundamental constraints: **Scope**, **Time**, and **Cost**.'
        },
        {
          type: 'highlight',
          content: '💡 **Trade-offs**: If time is short → reduce scope OR increase costs. If budget is fixed → reduce scope OR extend timeline.'
        }
      ]
    },
    
    {
      id: 'ch1-extended-constraints',
      type: 'content',
      icon: '📊',
      title: 'Extended Project Constraints',
      content: [
        {
          type: 'table',
          content: {
            headers: ['Constraint', 'Key Questions'],
            rows: [
              ['Scope', 'What does the customer expect? What work will be done?'],
              ['Time', 'What is the schedule? How long should it take?'],
              ['Cost', 'What is the budget? What resources are needed?'],
              ['Quality', 'How good must the product be to satisfy the customer?'],
              ['Risk', 'How much uncertainty are we willing to accept?'],
            ]
          }
        }
      ]
    },
    
    // ========== SECTION 10: SUCCESS ==========
    {
      id: 'ch1-section-10',
      type: 'section',
      sectionNumber: '10',
      title: 'Project Success',
      subtitle: 'How do we measure it?',
      gradient: 'warm',
    },
    
    {
      id: 'ch1-success',
      type: 'content',
      icon: '🏆',
      title: 'Defining Project Success',
      content: [
        {
          type: 'bullet',
          content: [
            'The project met **scope, time, and cost** goals',
            'The project **satisfied the user/customer/sponsor**',
            'The results met **main objectives** (e.g., ROI, cost savings)',
          ]
        },
        {
          type: 'highlight',
          content: '📌 **Example**: Upgrading 500 desktop computers within three months for $300,000'
        }
      ]
    },
    
    // ========== TAKEAWAY ==========
    {
      id: 'ch1-takeaway',
      type: 'takeaway',
      title: 'Key Takeaways',
      items: [
        {
          icon: '🎯',
          title: 'Projects vs Jobs',
          description: 'Projects have uncertainty, clear goals, and temporary teams',
          color: 'blue',
        },
        {
          icon: '💻',
          title: 'Software is Special',
          description: 'Invisible, complex, must conform, highly flexible',
          color: 'coral',
        },
        {
          icon: '👥',
          title: 'Stakeholders Matter',
          description: 'Identify early, align objectives, maintain communication',
          color: 'teal',
        },
        {
          icon: '⚖️',
          title: 'Triple Constraint',
          description: 'Balance scope, time, cost — trade-offs are inevitable',
          color: 'gold',
        },
      ],
      bottomNote: 'Next: Chapter 2 — Project Planning',
    },
  ],
  
  quiz: {
    mcq: [
      {
        id: 'ch1-mcq-1',
        question: 'A software team is building a mobile app for a client. The client frequently changes requirements, and the team struggles to show visible progress to stakeholders. Which TWO of Brooks\' factors BEST explain these challenges?',
        options: [
          'Invisibility and Flexibility',
          'Complexity and Conformity',
          'Invisibility and Complexity',
          'Flexibility and Conformity',
        ],
        correctIndex: 0,
        explanation: 'Invisibility makes it hard to show progress (you can\'t see software being built like a building), and Flexibility means software is easily changed, leading to frequent requirement changes.',
      },
      {
        id: 'ch1-mcq-2',
        question: 'Your project is 2 weeks behind schedule, but the budget is fixed and the client refuses to remove any features. According to the Triple Constraint, what is the MOST likely outcome?',
        options: [
          'The project will be delivered on time with all features',
          'Quality will likely suffer as the team rushes to deliver',
          'The budget will automatically increase',
          'The schedule will adjust itself',
        ],
        correctIndex: 1,
        explanation: 'When scope and cost are fixed but time is constrained, quality often becomes the variable that suffers. This is sometimes called the "hidden fourth constraint."',
      },
      {
        id: 'ch1-mcq-3',
        question: 'A project manager notices that "6,000 documents were processed at location X today." What must happen before this becomes useful for decision-making?',
        options: [
          'It must be stored in a database',
          'It must be transformed into information through data processing',
          'It must be sent to all stakeholders',
          'It must be compared to yesterday\'s count',
        ],
        correctIndex: 1,
        explanation: 'Raw data ("6,000 documents") must be processed into meaningful information (e.g., "productivity is 100 documents/day") before it can inform decisions in the management control cycle.',
      },
      {
        id: 'ch1-mcq-4',
        question: 'Which scenario BEST represents a "Job" rather than a "Project"?',
        options: [
          'Building a new e-commerce website for a startup',
          'A mechanic replacing brake pads using a standard procedure',
          'Researching a potential cure for a rare disease',
          'Developing a custom CRM system for a corporation',
        ],
        correctIndex: 1,
        explanation: 'Jobs involve well-defined, routine tasks with minimal uncertainty. A mechanic following a standard brake pad replacement procedure fits this perfectly.',
      },
      {
        id: 'ch1-mcq-5',
        question: 'A stakeholder who actively opposes your project has been identified. According to best practices, when should you have identified this person?',
        options: [
          'During the execution phase when problems arise',
          'As early as possible to establish communication channels',
          'Only after they raise formal objections',
          'During the project closing phase',
        ],
        correctIndex: 1,
        explanation: 'Stakeholders (including opponents) should be identified as early as possible to set communication channels from the start and address concerns proactively.',
      },
      {
        id: 'ch1-mcq-6',
        question: 'Your project objective is: "Improve system performance." Why does this violate SMART criteria?',
        options: [
          'It\'s not Achievable — performance can always be improved infinitely',
          'It\'s not Specific or Measurable — "improve" and "performance" are vague',
          'It\'s not Time-constrained — no deadline is mentioned',
          'Both B and C are correct',
        ],
        correctIndex: 3,
        explanation: 'The objective fails both Specific/Measurable (what performance? by how much?) AND Time-constrained (by when?). A SMART version: "Reduce page load time from 5s to under 2s by March 31."',
      },
      {
        id: 'ch1-mcq-7',
        question: 'In the ISO 12207 life-cycle, you\'ve completed coding individual modules. What phase comes NEXT?',
        options: [
          'Qualification Testing',
          'Installation',
          'Integration',
          'Architecture Design',
        ],
        correctIndex: 2,
        explanation: 'After Code and Test (individual components), the next phase is Integration — putting the components together. Qualification Testing comes after integration.',
      },
      {
        id: 'ch1-mcq-8',
        question: 'A task has these characteristics: it\'s non-routine, involves specialists from 5 departments, has a strict deadline, and will create a unique product. What can you predict about this task?',
        options: [
          'It will be easy to manage because it\'s well-defined',
          'It will be more difficult because multiple project characteristics apply',
          'It\'s not a project because it involves multiple departments',
          'It will require no planning since specialists are involved',
        ],
        correctIndex: 1,
        explanation: 'The more project characteristics that apply (non-routine, multiple specialisms, constrained, unique outcome), the MORE difficult the task will be to manage.',
      },
      {
        id: 'ch1-mcq-9',
        question: 'Which management activity involves identifying that a delay has occurred and deciding to hire contractors to get back on schedule?',
        options: [
          'Monitoring only',
          'Controlling only',
          'Monitoring AND Controlling',
          'Planning AND Directing',
        ],
        correctIndex: 2,
        explanation: 'Monitoring is checking progress (identifying the delay). Controlling is taking action to remedy hold-ups (deciding to hire contractors). Both activities work together.',
      },
      {
        id: 'ch1-mcq-10',
        question: 'An in-house project manager and an out-sourced project manager face different challenges. Which challenge is UNIQUE to out-sourced projects?',
        options: [
          'Managing stakeholder expectations',
          'Navigating different organizational cultures and priorities',
          'Balancing the Triple Constraint',
          'Defining SMART objectives',
        ],
        correctIndex: 1,
        explanation: 'Out-sourced projects involve clients and developers from DIFFERENT organizations, creating unique challenges around organizational culture, communication, and potentially conflicting priorities.',
      },
    ],
    trueFalse: [
      {
        id: 'ch1-tf-1',
        statement: 'If a project\'s initial plan is flawed, the project is guaranteed to fail.',
        isTrue: false,
        explanation: 'A defective plan can often be REMEDIED by good project control and management during execution. The control cycle allows for corrections.',
      },
      {
        id: 'ch1-tf-2',
        statement: 'Research projects and software projects face similar levels of uncertainty.',
        isTrue: false,
        explanation: 'Research/exploration has VERY uncertain outcomes (e.g., finding a cure for cancer). Software projects sit in the middle — hoped-for outcomes with manageable risks.',
      },
      {
        id: 'ch1-tf-3',
        statement: 'A stakeholder who will never use the final product cannot affect the project\'s success.',
        isTrue: false,
        explanation: 'Opponents, suppliers, and others who don\'t use the product can significantly affect success. A key supplier failing or an opponent blocking approvals can derail a project.',
      },
      {
        id: 'ch1-tf-4',
        statement: 'According to Brooks, software complexity arises because many software components are reused identically.',
        isTrue: false,
        explanation: 'The OPPOSITE is true. Brooks stated software is complex because "no two parts are alike" — unlike manufacturing where parts are identical.',
      },
      {
        id: 'ch1-tf-5',
        statement: 'The Qualification Testing phase in ISO 12207 tests individual code modules.',
        isTrue: false,
        explanation: 'Qualification Testing tests the SYSTEM as a whole, not just individual modules. Individual component testing happens in the Code and Test phase.',
      },
      {
        id: 'ch1-tf-6',
        statement: 'If you successfully meet all scope, time, and cost targets, the project is automatically considered successful.',
        isTrue: false,
        explanation: 'Project success also includes satisfying the customer/sponsor and meeting the main objective (e.g., ROI). A project can meet all constraints but still fail to deliver value.',
      },
      {
        id: 'ch1-tf-7',
        statement: 'In-house projects eliminate the need for stakeholder management.',
        isTrue: false,
        explanation: 'Even in-house projects have multiple stakeholders (users in different departments, management, support staff) who may have different objectives.',
      },
      {
        id: 'ch1-tf-8',
        statement: 'Data and information are interchangeable terms in project management.',
        isTrue: false,
        explanation: 'Data is raw details ("6,000 documents processed"). Information is processed, meaningful data ("productivity is 100 documents/day"). The distinction is crucial for decision-making.',
      },
      {
        id: 'ch1-tf-9',
        statement: 'A temporary work group is one of the characteristics that makes a task more "project-like".',
        isTrue: true,
        explanation: 'Projects are typically carried out by temporary work groups that disband after completion, unlike permanent operational teams.',
      },
      {
        id: 'ch1-tf-10',
        statement: 'The Feasibility Study should occur after detailed planning is complete.',
        isTrue: false,
        explanation: 'Feasibility Study comes FIRST. Planning only happens IF the project is deemed feasible. You don\'t invest in detailed planning for an infeasible project.',
      },
    ],
    matching: [
      {
        id: 'ch1-match-1',
        instruction: 'Match each Brooks factor with the project management CHALLENGE it creates:',
        pairs: [
          { left: 'Invisibility', right: 'Difficulty demonstrating progress to stakeholders' },
          { left: 'Complexity', right: 'Hard to estimate effort and find all dependencies' },
          { left: 'Conformity', right: 'Requirements change as client understanding evolves' },
          { left: 'Flexibility', right: 'Scope creep and constant modification requests' },
        ],
      },
      {
        id: 'ch1-match-2',
        instruction: 'Match each management activity with its EXAMPLE:',
        pairs: [
          { left: 'Monitoring', right: 'Reviewing weekly status reports to check milestones' },
          { left: 'Controlling', right: 'Reassigning developers when a module falls behind' },
          { left: 'Innovating', right: 'Proposing a new testing approach for recurring bugs' },
          { left: 'Representing', right: 'Presenting project status at a client meeting' },
        ],
      },
      {
        id: 'ch1-match-3',
        instruction: 'Match each ISO 12207 phase with its PRIMARY deliverable:',
        pairs: [
          { left: 'Requirements Analysis', right: 'Documented functional and quality requirements' },
          { left: 'Architecture Design', right: 'System component specifications' },
          { left: 'Integration', right: 'Combined working system' },
          { left: 'Installation', right: 'Operational system with trained users' },
        ],
      },
      {
        id: 'ch1-match-4',
        instruction: 'Match each constraint with the question it answers:',
        pairs: [
          { left: 'Scope', right: 'What features and functions will be delivered?' },
          { left: 'Quality', right: 'What level of defects is acceptable?' },
          { left: 'Risk', right: 'What might go wrong and how likely is it?' },
          { left: 'Time', right: 'When must this be completed?' },
        ],
      },
      {
        id: 'ch1-match-5',
        instruction: 'Match each stakeholder location with an example:',
        pairs: [
          { left: 'Within project team', right: 'Lead developer assigned to the project' },
          { left: 'Same org, outside team', right: 'IT security officer approving architecture' },
          { left: 'Outside organization', right: 'End users at the client company' },
          { left: 'Opponent', right: 'Department head whose budget funded the project' },
        ],
      },
    ],
    fillBlank: [
      {
        id: 'ch1-fill-1',
        sentence: 'When a project is running behind schedule but scope and cost are fixed, _____ often becomes the unintended trade-off.',
        answer: 'quality',
        acceptableAnswers: ['quality', 'Quality', 'QUALITY'],
      },
      {
        id: 'ch1-fill-2',
        sentence: 'The management control cycle transforms raw _____ into meaningful information that supports decision-making.',
        answer: 'data',
        acceptableAnswers: ['data', 'Data', 'DATA'],
      },
      {
        id: 'ch1-fill-3',
        sentence: 'According to Brooks, software is complex because no two _____ are alike.',
        answer: 'parts',
        acceptableAnswers: ['parts', 'Parts', 'components', 'modules', 'pieces'],
      },
      {
        id: 'ch1-fill-4',
        sentence: 'Projects sit on a spectrum between routine jobs (low uncertainty) and _____ (high uncertainty).',
        answer: 'exploration',
        acceptableAnswers: ['exploration', 'Exploration', 'research'],
      },
      {
        id: 'ch1-fill-5',
        sentence: 'In the Triple Constraint, if you need to add features (increase scope), you must either increase cost or extend _____.',
        answer: 'time',
        acceptableAnswers: ['time', 'Time', 'schedule', 'timeline', 'deadline'],
      },
      {
        id: 'ch1-fill-6',
        sentence: 'Stakeholders should be identified as _____ as possible to establish communication channels from the start.',
        answer: 'early',
        acceptableAnswers: ['early', 'Early', 'EARLY', 'soon'],
      },
    ],
  },
};
```

---

# 🚀 BUILD INSTRUCTIONS

1. **Initialize Project**
   ```bash
   npx create-next-app@latest spm-study-hub --typescript --tailwind --eslint --app --src-dir
   cd spm-study-hub
   ```

2. **Install Dependencies**
   ```bash
   npm install framer-motion lucide-react
   ```

3. **Create Folder Structure**
   Follow the structure above exactly

4. **Create Reference Docs**
   Create `docs/SLIDE_RULES.md`, `docs/QUIZ_RULES.md`, `docs/CHAPTER_TEMPLATE.md`

5. **Build Components**
   Start with types.ts → chapter1.ts → UI components → pages

6. **Test Locally**
   ```bash
   npm run dev
   ```

7. **Deploy to Vercel**
   ```bash
   vercel
   ```

---

# ✅ CHECKLIST BEFORE COMPLETING

- [ ] All 9 slide types render correctly
- [ ] Step-by-step animation works (Space/→ advances)
- [ ] Progress bar updates as slides advance
- [ ] "Start Quiz" button appears at end of slides
- [ ] All 4 quiz types work correctly
- [ ] Quiz shows results with explanations
- [ ] Progress saves to localStorage
- [ ] AI assistant connects to Groq
- [ ] Mobile responsive
- [ ] Deployed to Vercel
- [ ] Adding new chapter only requires new file + index update

---

**Build something amazing! Let's help students succeed! 🎓**
