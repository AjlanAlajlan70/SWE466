# Quiz Creation Rules

## Question Types

### 1. Multiple Choice (MCQ)
```typescript
{
  id: string,
  question: string,
  options: string[], // Exactly 4 options (A, B, C, D)
  correctIndex: number, // 0-3
  explanation: string
}
```

### 2. True/False
```typescript
{
  id: string,
  statement: string,
  isTrue: boolean,
  explanation: string
}
```

### 3. Matching
```typescript
{
  id: string,
  instruction: string,
  pairs: Array<{
    left: string,
    right: string
  }>,
  explanation: string
}
```

### 4. Fill in the Blank
```typescript
{
  id: string,
  question: string, // Use ___ for blank
  acceptableAnswers: string[], // Case-insensitive
  explanation: string
}
```

## Validation Rules

### MCQ
- User must select one option
- Correct when selectedIndex === correctIndex
- Show explanation after answer

### True/False
- User must select True or False
- Correct when selection === isTrue
- Show explanation after answer

### Matching
- User must connect all pairs
- Correct when all pairs match correctly
- Partial credit not given
- Show explanation after all matched

### Fill in the Blank
- User types answer in text input
- Validation: answer.toLowerCase().trim() in acceptableAnswers
- Be lenient with acceptable answers
- Show explanation after answer

## Quiz Flow

1. Questions presented one at a time
2. User cannot skip without answering
3. Immediate feedback after each question
4. Explanation shown regardless of correct/incorrect
5. Progress saved to localStorage
6. Results summary at end with breakdown by type

## Scoring

- Each question worth 1 point
- Final score = correct / total * 100
- Pass threshold: 70%
- Scores saved per chapter

## Question Writing Guidelines

1. Clear, unambiguous wording
2. One correct answer per MCQ
3. Plausible distractors (wrong options should be reasonable)
4. Explanations should teach, not just state correctness
5. Balanced difficulty throughout
6. Cover all major topics from slides
