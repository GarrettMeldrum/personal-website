import { getPostBySlug, getAllPosts, type Post } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Blog post page component
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post: Post = getPostBySlug(slug);
  if (!post) return notFound()

  return (
    <main>
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow p-8">
        <header className="pb-6 mb-8 border-b">
          <h1 className="pb-2 text-4xl font-bold">{post.title}</h1>
          <p className="text-2xl italic">{post.date}</p>
        </header>
        
        <article className="prose dark:prose-invert">
          {post.content && (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </article>
      </div>
    </main>
  )
}

// Generate static paths at build time
export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Set dynamic metadata based on markdown frontmatter
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }, parent: ResolvingMetadata): Promise<Metadata> {
    void parent;
    const { slug } = await params;
    const post: Post = getPostBySlug(slug);
    if (!post) return {};

    return {
      title: post.title,
    }
  }
