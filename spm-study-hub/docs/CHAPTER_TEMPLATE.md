# Chapter Template

## Chapter Structure

```typescript
export const chapterX: Chapter = {
  id: 'unique-slug',
  slug: 'url-friendly-slug',
  chapterNumber: X,
  title: 'Chapter Title',
  description: 'Brief description for chapter card',
  icon: '📚', // Emoji for chapter
  slides: [...],
  quiz: {
    mcq: [...],
    trueFalse: [...],
    matching: [...],
    fillBlank: [...]
  }
};
```

## Recommended Slide Distribution

For a typical chapter (~25 slides):
- 1 Title Slide
- 3-4 Section Slides
- 15-18 Content Slides
- 2-3 Comparison/Timeline Slides
- 1 Takeaway Slide

## Recommended Quiz Distribution

For a typical chapter (~30 questions):
- 12-15 MCQ (40-50%)
- 6-8 True/False (20-25%)
- 4-5 Matching sets (15%)
- 5-6 Fill in the Blank (15-20%)

## Content Guidelines

### Title Slide
- Chapter number prominent
- Clear, concise title
- Subtitle provides context
- Objective states learning goals

### Section Slides
- Used to group related content
- Section number (1, 2, 3...)
- Short, descriptive title

### Content Slides
- Mix content types for variety
- 2-4 content items per slide
- Progressive disclosure via steps
- Visual elements (icons, highlights)

### Takeaway Slide
- Always last content slide
- 4 key points
- Actionable or memorable
- Icons help visual memory

## Quiz Guidelines

### Coverage
- All major concepts from slides
- At least one question per section
- Mix difficulty levels

### MCQ Best Practices
- Stem (question) is complete thought
- All options similar length
- Avoid "all of the above"
- One clearly correct answer

### True/False Best Practices
- Avoid double negatives
- Test specific facts
- 50/50 mix of true and false

### Matching Best Practices
- 4-6 pairs per set
- Clear relationship between pairs
- Items should not be too similar

### Fill in Blank Best Practices
- Test key terminology
- Provide multiple acceptable spellings
- Context clues should be sufficient
