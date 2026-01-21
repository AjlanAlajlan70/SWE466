# 📚 SPM Study Hub — Chapter Extraction Prompt

**How to use this:** Copy everything below the line and paste it into a NEW Claude.ai chat BEFORE uploading new chapter slides. Then upload the PPTX file.

---

# START OF PROMPT — COPY FROM HERE ⬇️

You are helping me build the **SPM Study Hub** — an interactive study platform for my Software Project Management course at King Saud University. I'm uploading chapter slides that need to be converted into structured TypeScript data.

## 🎯 Your Mission

1. **Extract 100% of the content** — NOTHING should be lost or summarized away
2. **Structure it as TypeScript** — Following the exact format I'll provide
3. **Preserve exact wording** — Definitions, terms, and lists must match the original EXACTLY
4. **Create quality quiz questions** — Following strict rules (no trivia!)
5. **Provide verification checklist** — So I can confirm nothing is missing

---

## ⚠️ CRITICAL RULES

### Content Preservation (NON-NEGOTIABLE)

```
✅ DO:
- Copy definitions WORD FOR WORD
- Include ALL bullet points, even if they seem minor
- Preserve ALL examples mentioned
- Keep exact terminology used by the instructor
- Include ALL table data
- Note any diagrams/figures (describe what they show)

❌ DO NOT:
- Summarize or condense content
- Paraphrase definitions
- Skip "obvious" points
- Merge similar concepts
- Add information not in the slides
- Change technical terms
```

### Why This Matters
> I will be tested on the ORIGINAL slides. If the slide says "Projects have a definite beginning and end" — that EXACT phrasing might be on my exam. Don't change it to "Projects are temporary" even if it means the same thing.

---

## 📐 Output Structure

### Part 1: TypeScript Chapter Data

```typescript
// src/data/chapters/chapter[N].ts

import { Chapter } from './types';

export const chapter[N]: Chapter = {
  id: 'chapter-[N]',
  slug: '[url-friendly-slug]',
  chapterNumber: [N],
  title: '[Exact title from slides]',
  description: '[Brief description for chapter card]',
  icon: '[appropriate emoji]',
  
  slides: [
    // EVERY slide converted to proper format
  ],
  
  quiz: {
    mcq: [
      // 8-10 scenario-based questions
    ],
    trueFalse: [
      // 8-10 conceptual questions
    ],
    matching: [
      // 4-5 application-based matching
    ],
    fillBlank: [
      // 5-6 key concept questions
    ],
  },
};
```

### Part 2: Verification Checklist

After the TypeScript, provide:

```markdown
## ✅ Extraction Verification Checklist

### Slides Extracted
- [ ] Slide 1: [Title] — [Brief description of content]
- [ ] Slide 2: [Title] — [Brief description of content]
... (every slide)

### Key Content Preserved
- [ ] Definitions: [count] extracted
- [ ] Tables: [count] extracted  
- [ ] Lists/Bullet points: [count] sets extracted
- [ ] Examples: [count] extracted
- [ ] Diagrams/Figures: [count] described

### Terminology Check
Key terms used (verify these match your slides exactly):
- [Term 1]
- [Term 2]
- [Term 3]
...

### Quiz Summary
- MCQ: [count] questions
- True/False: [count] questions
- Matching: [count] questions
- Fill-in-blank: [count] questions
```

---

## 📝 Slide Type Formats

Use these formats based on slide content:

### Title Slide (Chapter Opening)
```typescript
{
  id: 'ch[N]-title',
  type: 'title',
  chapterNumber: [N],
  title: '[Exact title]',
  subtitle: '[Exact subtitle]',
  learningObjective: '[If present]',
}
```

### Section Divider (Major Topic Change)
```typescript
{
  id: 'ch[N]-section-[NN]',
  type: 'section',
  sectionNumber: '[NN]', // "01", "02", etc.
  title: '[Section title]',
  subtitle: '[If present]',
  gradient: 'cool' | 'warm' | 'coral' | 'teal',
}
```

### Content Slide (Main Content)
```typescript
{
  id: 'ch[N]-[descriptive-name]',
  type: 'content',
  icon: '[emoji]',
  title: '[Slide title]',
  tagline: '[Subtitle if present]',
  content: [
    {
      type: 'definition',
      content: '**[Term]**: "[Exact definition from slide]"'
    },
    {
      type: 'bullet',
      content: [
        '[Exact bullet point 1]',
        '[Exact bullet point 2]',
        // ALL bullets, not just some
      ]
    },
    {
      type: 'table',
      content: {
        headers: ['[Header1]', '[Header2]'],
        rows: [
          ['[Cell1]', '[Cell2]'],
          // ALL rows
        ]
      }
    },
    {
      type: 'highlight',
      content: '💡 [Important point from slide]'
    },
    {
      type: 'warning', 
      content: '⚠️ [Critical point or common mistake]'
    }
  ]
}
```

### Takeaway Slide (Summary/Key Points)
```typescript
{
  id: 'ch[N]-takeaway',
  type: 'takeaway',
  items: [
    {
      icon: '[emoji]',
      title: '[Key point title]',
      description: '[Brief description]',
      color: 'blue' | 'coral' | 'teal' | 'gold',
    },
    // Exactly 4 items
  ]
}
```

---

## 🧠 Quiz Question Rules

### ❌ NEVER Create These (Automatic Failures)

```
- "Who is the author of...?"
- "What year was X published?"
- "What does [ACRONYM] stand for?"
- "According to slide X..."
- "The textbook mentions..."
- Questions with ambiguous answers
- Pure memorization questions
```

### ✅ ALWAYS Create These

```
- Scenario-based: "Your project is behind schedule, what should you do?"
- Conceptual: "Why does X lead to Y?"
- Application: "Which approach is best when...?"
- Comparison: "How does X differ from Y in practice?"
- Critical thinking: "What would happen if...?"
```

### Question Type Requirements

| Type | Count | Focus |
|------|-------|-------|
| MCQ | 8-10 | Scenarios, application |
| True/False | 8-10 | Common misconceptions |
| Matching | 4-5 | Concepts → Real-world applications |
| Fill-blank | 5-6 | Key terms in context |

### Every Question Must Have
- Clear, single correct answer
- Plausible distractors (for MCQ)
- Helpful explanation that TEACHES something
- Connection to exam-relevant concepts

---

## 📋 Before You Start

Confirm you understand:

1. **Content preservation is #1 priority** — I'd rather have ugly slides than missing content
2. **Exact wording matters** — Don't paraphrase definitions
3. **Quiz questions test understanding** — Not memorization
4. **Verification checklist is required** — So I can cross-check

---

## 🚀 Ready!

Now I'll upload the chapter slides (PPTX file). Please:

1. Extract ALL content following the rules above
2. Structure as TypeScript (ready to copy into my project)
3. Create quality quiz questions
4. Provide verification checklist

Let's go! 📚

# END OF PROMPT — COPY UP TO HERE ⬆️
