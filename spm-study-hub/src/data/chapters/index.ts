import { Chapter } from './types';
import { chapter1 } from './chapter1';

// Chapter registry
const chapters: Chapter[] = [chapter1];

// Get chapter by slug
export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

// Get chapter by number
export function getChapterByNumber(chapterNumber: number): Chapter | undefined {
  return chapters.find((chapter) => chapter.chapterNumber === chapterNumber);
}

// Get all chapters
export function getAllChapters(): Chapter[] {
  return chapters;
}

// Get chapter slugs for static generation
export function getChapterSlugs(): string[] {
  return chapters.map((chapter) => chapter.slug);
}

// Export types
export * from './types';

// Export chapter data
export { chapter1 };
