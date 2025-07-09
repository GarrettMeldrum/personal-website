import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import Image from 'next/image'
import type { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
  params: {
    slug: string
  }
}

// Blog post page component
export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const html = marked(post.content)

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <article className="prose dark:prose-invert prose-lg max-w-none">
        <h1 className="mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>

        {post.image && (
          <div className="my-6">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="rounded-xl w-full object-cover"
              priority
            />
          </div>
        )}

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
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description || '',
  }
}
