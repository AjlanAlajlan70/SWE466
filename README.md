# 📚 SPM Study Hub

An interactive study platform for **Software Project Management** courses. A personal initiative to help students study more effectively.

Built with Next.js, Framer Motion, and TypeScript. Features beautiful animated slides, smart quizzes, and an AI study assistant.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## 🌟 Features

- **Interactive Slides** — Step-by-step animated presentations
- **Smart Quizzes** — MCQ, True/False, Matching, Fill-in-blank
- **Progress Tracking** — Saves your progress locally
- **AI Assistant** — Ask questions about the material (Groq API)
- **Mobile Friendly** — Works on all devices
- **Easy to Share** — Just send the URL to classmates

---

## 🚀 Live Demo

**[https://spm-study-hub.vercel.app](https://spm-study-hub.vercel.app)** *(update with your actual URL)*

---

## 📖 Table of Contents

1. [Quick Start](#-quick-start)
2. [Project Structure](#-project-structure)
3. [Tech Stack](#-tech-stack)
4. [Adding New Chapters](#-adding-new-chapters)
5. [Complete Workflow](#-complete-workflow)
6. [Prompts Reference](#-prompts-reference)
7. [Design System](#-design-system)
8. [Quiz Rules](#-quiz-rules)
9. [Deployment](#-deployment)
10. [Troubleshooting](#-troubleshooting)
11. [Contributing](#-contributing)

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- [Groq API Key](https://console.groq.com/keys) (free)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/spm-study-hub.git
cd spm-study-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
spm-study-hub/
├── 📄 README.md                    # You are here!
├── 📄 package.json
├── 📄 .env.example                 # Environment template
├── 📄 .env.local                   # Your secrets (don't commit!)
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
├── 📄 next.config.js
│
├── 📁 docs/                        # 📚 IMPORTANT REFERENCE DOCS
│   ├── 📄 SLIDE_RULES.md           # How to structure slides
│   ├── 📄 QUIZ_RULES.md            # How to write good questions
│   └── 📄 CHAPTER_TEMPLATE.md      # Template for new chapters
│
├── 📁 prompts/                     # 🤖 AI PROMPTS (for Claude)
│   ├── 📄 CLI_CLAUDE_FINAL_PROMPT.md      # Build the project
│   ├── 📄 CHAPTER_EXTRACTION_PROMPT.md    # Extract new chapters
│   └── 📄 VALIDATION_PROMPT.md            # QA/validate content
│
├── 📁 public/
│   └── 📄 favicon.ico
│
└── 📁 src/
    ├── 📁 app/
    │   ├── 📄 layout.tsx           # Root layout with fonts
    │   ├── 📄 page.tsx             # Landing page
    │   ├── 📄 globals.css          # Global styles
    │   │
    │   ├── 📁 chapter/
    │   │   └── 📁 [slug]/
    │   │       ├── 📄 page.tsx     # Slides view
    │   │       └── 📁 quiz/
    │   │           └── 📄 page.tsx # Quiz page
    │   │
    │   └── 📁 api/
    │       └── 📁 ai/
    │           └── 📄 route.ts     # Groq API proxy
    │
    ├── 📁 components/
    │   ├── 📁 slides/              # Slide components
    │   ├── 📁 quiz/                # Quiz components
    │   ├── 📁 ai/                  # AI assistant
    │   └── 📁 ui/                  # Reusable UI
    │
    ├── 📁 data/
    │   └── 📁 chapters/
    │       ├── 📄 types.ts         # TypeScript interfaces
    │       ├── 📄 index.ts         # Chapter registry
    │       ├── 📄 chapter1.ts      # Chapter 1 data
    │       └── 📄 chapter2.ts      # Chapter 2 data (add as needed)
    │
    ├── 📁 hooks/                   # Custom React hooks
    │
    └── 📁 lib/                     # Utilities
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [Groq API](https://groq.com/) | AI assistant (free) |
| [Vercel](https://vercel.com/) | Deployment |

---

## 📚 Adding New Chapters

### The Easy Way (Recommended)

Adding a new chapter takes **3 simple steps**:

#### Step 1: Extract Content with Claude.ai

1. Open a **new chat** at [claude.ai](https://claude.ai)
2. Copy & paste the content from `prompts/CHAPTER_EXTRACTION_PROMPT.md`
3. Upload the chapter PPTX file
4. Receive ready-to-use TypeScript code

#### Step 2: Add to Project

```bash
# Create the file
touch src/data/chapters/chapter2.ts

# Paste the TypeScript code Claude gave you
```

Then add ONE line to `src/data/chapters/index.ts`:

```typescript
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';  // ← Add import

export const chapters: Chapter[] = [
  chapter1,
  chapter2,  // ← Add to array
];
```

#### Step 3: Deploy

```bash
git add .
git commit -m "Add Chapter 2: [Chapter Title]"
git push
# Vercel auto-deploys! 🚀
```

### Manual Way (If Needed)

See `docs/CHAPTER_TEMPLATE.md` for the full template structure.

---

## 🔄 Complete Workflow

```
╔═══════════════════════════════════════════════════════════════╗
║                 📚 ADDING A NEW CHAPTER                        ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │  1️⃣  EXTRACT                                            │  ║
║  │  ────────────────────────────────────────────────────── │  ║
║  │  • Open Claude.ai (new chat)                            │  ║
║  │  • Paste: prompts/CHAPTER_EXTRACTION_PROMPT.md          │  ║
║  │  • Upload: Chapter PPTX file                            │  ║
║  │  • Get: TypeScript code + Quiz + Checklist              │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                              ↓                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │  2️⃣  VERIFY                                             │  ║
║  │  ────────────────────────────────────────────────────── │  ║
║  │  • Open original PPTX                                   │  ║
║  │  • Check against verification checklist                 │  ║
║  │  • Ensure definitions match EXACTLY                     │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                              ↓                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │  3️⃣  VALIDATE (Optional)                                │  ║
║  │  ────────────────────────────────────────────────────── │  ║
║  │  • Open Claude.ai (another new chat)                    │  ║
║  │  • Paste: prompts/VALIDATION_PROMPT.md                  │  ║
║  │  • Paste: The TypeScript content                        │  ║
║  │  • Get: QA report with issues and fixes                 │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                              ↓                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │  4️⃣  ADD & DEPLOY                                       │  ║
║  │  ────────────────────────────────────────────────────── │  ║
║  │  • Create: src/data/chapters/chapterN.ts                │  ║
║  │  • Update: src/data/chapters/index.ts                   │  ║
║  │  • Run: git add . && git commit && git push             │  ║
║  │  • Done! Vercel auto-deploys 🚀                         │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🤖 Prompts Reference

All prompts are stored in the `prompts/` folder:

| Prompt File | Purpose | When to Use |
|-------------|---------|-------------|
| `CLI_CLAUDE_FINAL_PROMPT.md` | Build the entire project from scratch | Only once, at project creation |
| `CHAPTER_EXTRACTION_PROMPT.md` | Extract chapter content from PPTX | Every new chapter |
| `VALIDATION_PROMPT.md` | QA and validate content | After extraction (optional) |

### How to Use Each Prompt

#### CLI_CLAUDE_FINAL_PROMPT.md
```bash
# In terminal with Claude CLI
claude
> "Read prompts/CLI_CLAUDE_FINAL_PROMPT.md and build the complete project"
```

#### CHAPTER_EXTRACTION_PROMPT.md
```
1. Go to claude.ai
2. Start new chat
3. Copy-paste the entire prompt
4. Upload PPTX file
5. Copy the TypeScript output
```

#### VALIDATION_PROMPT.md
```
1. Go to claude.ai
2. Start new chat
3. Copy-paste the entire prompt
4. Paste content to validate
5. Review the QA report
```

---

## 🎨 Design System

### Colors

| Variable | Hex | Usage |
|----------|-----|-------|
| `--bg-primary` | `#faf9f7` | Main background |
| `--bg-secondary` | `#f0eeeb` | Secondary background |
| `--text-primary` | `#1a1a1a` | Main text |
| `--text-secondary` | `#4a4a4a` | Secondary text |
| `--text-muted` | `#7a7a7a` | Muted text |
| `--accent-blue` | `#2c5aa0` | Primary accent |
| `--accent-coral` | `#e85d4c` | Warning/important |
| `--accent-gold` | `#c9a227` | Highlights |
| `--accent-teal` | `#1a7f7a` | Success |

### Typography

| Font | Usage |
|------|-------|
| Instrument Serif | Headings (h1, h2, h3) |
| Outfit | Body text |
| JetBrains Mono | Code, monospace |

### Slide Types

| Type | Purpose |
|------|---------|
| `title` | Chapter opening slide |
| `section` | Major topic divider |
| `content` | Main content delivery |
| `takeaway` | Summary/key points (2x2 grid) |
| `comparison` | Side-by-side comparison |
| `timeline` | Sequential process |

---

## 📝 Quiz Rules

### ❌ NEVER Create

- Questions about authors, dates, page numbers
- "According to slide X..."
- "What does [ACRONYM] stand for?"
- Ambiguous or trick questions
- Pure memorization questions

### ✅ ALWAYS Create

- Scenario-based questions
- Conceptual understanding tests
- Application questions ("What would you do if...")
- Comparison questions
- Critical thinking questions

### Question Counts per Chapter

| Type | Count | Focus |
|------|-------|-------|
| MCQ | 8-10 | Scenarios, application |
| True/False | 8-10 | Common misconceptions |
| Matching | 4-5 | Concepts → Applications |
| Fill-blank | 5-6 | Key terms in context |

See `docs/QUIZ_RULES.md` for complete guidelines.

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# GROQ_API_KEY=your_key_here
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | API key from [Groq Console](https://console.groq.com/keys) |

---

## 🔧 Troubleshooting

### Common Issues

<details>
<summary><strong>Slides not showing</strong></summary>

- Check that the chapter is imported in `index.ts`
- Verify the slug matches the URL
- Run `npm run build` to check for TypeScript errors

</details>

<details>
<summary><strong>Quiz not working</strong></summary>

- Ensure all question types have valid data
- Check `correctIndex` is within range (0-3 for MCQ)
- Verify `isTrue` is boolean for True/False

</details>

<details>
<summary><strong>AI Assistant not responding</strong></summary>

- Check `GROQ_API_KEY` is set in `.env.local`
- Verify key is valid at [Groq Console](https://console.groq.com/keys)
- Check browser console for API errors

</details>

<details>
<summary><strong>Animations not working</strong></summary>

- Ensure Framer Motion is installed: `npm install framer-motion`
- Check for CSS conflicts with Tailwind

</details>

<details>
<summary><strong>Build fails on Vercel</strong></summary>

- Run `npm run build` locally first
- Check for TypeScript errors
- Ensure all imports are correct

</details>

### Getting Help

1. Check this README first
2. Review the docs in `docs/` folder
3. Check existing [GitHub Issues](https://github.com/YOUR_USERNAME/spm-study-hub/issues)
4. Open a new issue with details

---

## 📊 Chapter Status

| Chapter | Title | Status | Last Updated |
|---------|-------|--------|--------------|
| 1 | Introduction to SPM | ✅ Complete | [Date] |
| 2 | Project Planning | ⏳ Pending | - |
| 3 | TBD | ⏳ Pending | - |
| ... | ... | ... | ... |

---

## 🤝 Contributing

### For Classmates

1. Found an error? [Open an issue](https://github.com/YOUR_USERNAME/spm-study-hub/issues)
2. Want to add a chapter? Follow the workflow above
3. Suggestions? Let me know!

### For Developers

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Claude AI — For assistance in building this platform
- Classmates who contributed and gave feedback
- Open source community for the amazing tools

> **Note:** This is a personal student initiative to help fellow students study. It is not affiliated with or endorsed by any university or institution.

---

## 📞 Contact

- **Created by:** Ajlan Sulaiman Alajlan
- **GitHub:** [@AjlanAlajlan70](https://github.com/AjlanAlajlan70)

---

<div align="center">

**Built with ❤️ to help students succeed**

*Good luck on your exams! 🎓*

</div>
