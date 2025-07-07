// /src/app/mountaineering/[slug]/page.tsx

import { getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { marked } from 'marked'
import Image from 'next/image'

type Props = {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: Props) {
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
