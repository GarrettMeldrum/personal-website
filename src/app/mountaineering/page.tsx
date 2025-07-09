import { getAllPosts, type Post } from '@/lib/blog'
import Link from 'next/link'

export default function MountaineeringIndex() {
  const posts: Post[] = getAllPosts()

  return (
    <main className="px-6 py-10 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-4">Mountaineering Blog</h1>
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-900"
          >
          <Link
            href={`/mountaineering/${post.slug}`}
            className="text-xl font-semibold text-blue-600 hover:underline"
          >
            {post.title}
          </Link>
          <p className="text-gray-500 text-sm">{post.date}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {post.description}
          </p>
        </div>
      ))}
    </main>
  )
}
