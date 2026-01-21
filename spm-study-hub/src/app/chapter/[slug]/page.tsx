import { notFound } from 'next/navigation';
import { getChapter, getChapterSlugs } from '@/data/chapters';
import { ChapterPageClient } from './ChapterPageClient';

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all chapters
export async function generateStaticParams() {
  const slugs = getChapterSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each chapter
export async function generateMetadata({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    return {
      title: 'Chapter Not Found | SPM Study Hub',
    };
  }

  return {
    title: `${chapter.title} | SPM Study Hub`,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    notFound();
  }

  return <ChapterPageClient chapter={chapter} />;
}
