import { getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { marked } from 'marked'

type Props = {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  return (
    <main className="prose dark:prose-invert max-w-3xl mx-auto px-6 py-10">
      <h1>{post.title}</h1>
      <p className="text-gray-500 text-sm">{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: marked(post.content) }} />
    </main>
  )
}
