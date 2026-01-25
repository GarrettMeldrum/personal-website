import { getAllPosts, type Post } from '@/lib/blog';
import Link from 'next/link';
import { Mountain } from 'lucide-react';

export default function MountaineeringIndex() {
  const posts: Post[] = getAllPosts();
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
          Mountaineering Journeys
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Documenting my mountaineering experience.
        </p>
      </header>

      {/* Blog Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Link 
            key={post.slug}
            href={`/mountaineering/${post.slug}`}
            className="block"
          >
            <article className="bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 hover:scale-[1.02] transition-all cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <Mountain className="w-6 h-6 text-orange-400 flex-shrink-0" />
                <h2 className="text-2xl font-semibold text-white">
                  {post.title}
                </h2>
              </div>

              <p className="text-gray-400 text-sm">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric' 
                })}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
