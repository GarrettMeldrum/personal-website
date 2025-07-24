// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  title: string;
  slug: string; // generates the directory dynamically on build
  date: string;
  image?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/mountaineering')

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      ...(data as Omit<Post, 'content'>),
      content,
      slug: data.slug,
      image: typeof data.image === 'string' && data.image.trim() !== ''
        ? data.image
        : '/images/mountaineering/default.jpg',
    } as Post;
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // newest first
  });
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    ...(data as Omit<Post, 'content'>),
    content,
    slug,
    image: typeof data.image === 'string' && data.image.trim() !== ''
      ? data.image : '/images/mountaineering/default.jpg',
  } as Post;
}
