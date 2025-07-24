import { getPostBySlug, getAllPosts, type Post } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import type { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
  params: {
    slug: string;
  };
};

// Blog post page component
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params;
  const post: Post = getPostBySlug(slug);
  if (!post) return notFound()

  const html = marked(post.content);

  return (
    <main className="px-6 py-16">
      <article className="prose prose-medium dark:prose-invert mx-auto">
        <h1 className="mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
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
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  void parent
  const { slug } = await params
  const post: Post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description || '',
  }
}
