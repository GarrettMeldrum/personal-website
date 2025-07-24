import { getAllPosts, type Post } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

export default function MountaineeringIndex() {
  const posts: Post[] = getAllPosts();

  return (
    <div className="px-6 py-10 mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">Mountaineering Blog Posts</h1>
      {posts.map((post) => (
        <div key={post.slug} className="border rounded-lg p-4 shadow-md">
          <Link href={`/mountaineering/${post.slug}`}>
            <h2 className="text-2xl font-semibold hover:underline">{post.title}</h2>
          </Link>
          <p className="text-sm text-gray-500">{post.date}</p>
          {typeof post.image === 'string' && post.image.trim() !== '' && (
            <div className="relative w-full max-w-md h-64 mt-2">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}