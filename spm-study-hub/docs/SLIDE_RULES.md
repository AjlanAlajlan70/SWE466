# Slide Creation Rules

## Slide Types

### 1. Title Slide (`title`)
- First slide of every chapter
- Contains: chapterNumber, title, subtitle, objective
- Full-width gradient background
- Large typography

### 2. Section Slide (`section`)
- Marks new sections within a chapter
- Contains: sectionNumber, title
- Large faded number in background
- Gradient accent

### 3. Content Slide (`content`)
- Main educational content
- Contains: icon, title, content[]
- Supports multiple content types
- Step-by-step animation

### 4. Takeaway Slide (`takeaway`)
- Key points summary
- Contains: title, points[] (4 items)
- 2x2 grid layout
- Each point has icon, title, description

### 5. Comparison Slide (`comparison`)
- Side-by-side comparison
- Contains: title, leftColumn, rightColumn
- Each column: title, items[]
- Highlight differences

### 6. Timeline Slide (`timeline`)
- Historical or process flow
- Contains: title, events[]
- Vertical timeline with nodes
- Each event: year/step, title, description

## Content Types (for Content Slide)

### Text
```typescript
{ type: 'text', content: 'Regular paragraph text' }
```

### Bullet
```typescript
{
  type: 'bullet',
  items: [
    'First bullet point',
    '**Bold text** in bullet',
    'Third point'
  ]
}
```

### Definition
```typescript
{
  type: 'definition',
  term: 'Key Term',
  definition: 'The explanation of the term'
}
```

### Highlight
```typescript
{
  type: 'highlight',
  icon: '💡',
  content: 'Important insight or tip'
}
```

### Warning
```typescript
{
  type: 'warning',
  content: 'Critical point to remember'
}
```

### Table
```typescript
{
  type: 'table',
  headers: ['Column 1', 'Column 2', 'Column 3'],
  rows: [
    ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3'],
    ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3']
  ]
}
```

## Animation Guidelines

1. Each content item appears one at a time
2. Use stagger timing (0.1s between items)
3. Slide transitions: 0.3s ease-out
4. Step transitions: 0.5s with y-axis movement

## Accessibility

- All images need alt text
- Sufficient color contrast
- Keyboard navigable
- Screen reader friendly
