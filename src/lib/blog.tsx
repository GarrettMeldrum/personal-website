// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface Post {
  title: string;
  slug: string; // generates the directory dynamically on build
  date: string;
  image?: string;
  content?: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/mountaineering')

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      ...(data as Post),
      slug: data.slug,
      image: typeof data.image === 'string' && data.image.trim() !== ''
        ? data.image
        : '/images/mountaineering/default.jpg',
    } as Post;
  });

  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...(data as Post),
    slug,
    image: typeof data.image === 'string' && data.image.trim() !== ''
      ? data.image : '/images/mountaineering/default.jpg',
    content: marked.parse(content)
  } as Post;
}
