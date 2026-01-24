import { getPostBySlug, getAllPosts, type Post } from '@/lib/blog';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';
import { Mountain, Calendar } from 'lucide-react';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post: Post = getPostBySlug(slug);
  
  if (!post) return notFound()
  
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Header Box */}
      <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Mountain className="w-8 h-8 text-orange-400" />
          <h1 className="text-4xl font-bold text-white">{post.title}</h1>
        </div>
        
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="w-5 h-5" />
          <p className="text-lg">
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Content Box */}
      <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
        <article 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-4
            prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-8
            prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-6
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-ul:text-gray-300 prose-ul:my-4
            prose-ol:text-gray-300 prose-ol:my-4
            prose-li:my-1
            prose-blockquote:border-l-4 prose-blockquote:border-orange-400 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-300
            prose-code:text-green-400 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-white/10 prose-pre:border prose-pre:border-white/20 prose-pre:rounded-lg prose-pre:p-4
            prose-img:rounded-lg prose-img:shadow-lg
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  )
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  void parent;
  const { slug } = await params;
  const post: Post = getPostBySlug(slug);
  
  if (!post) return {};
  
  return {
    title: post.title,
  }
}
