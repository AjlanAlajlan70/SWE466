import { notFound } from 'next/navigation';
import { getChapter, getChapterSlugs } from '@/data/chapters';
import { QuizPageClient } from './QuizPageClient';

interface QuizPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all chapters
export async function generateStaticParams() {
  const slugs = getChapterSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each quiz
export async function generateMetadata({ params }: QuizPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    return {
      title: 'Quiz Not Found | SPM Study Hub',
    };
  }

  return {
    title: `${chapter.title} Quiz | SPM Study Hub`,
    description: `Test your knowledge of ${chapter.title}`,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);

  if (!chapter) {
    notFound();
  }

  return <QuizPageClient chapter={chapter} />;
}
