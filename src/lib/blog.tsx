// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Post {
  title: string
  slug: string
  date: string
  description?: string
  tags?: string[]
  image?: string
  content: string
  [key: string]: unknown
}

const postsDirectory = path.join(process.cwd(), 'src/content/mountaineering')

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      ...(data as Omit<Post, 'content'>),
      content,
      slug: data.slug,
    } as Post
  })
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    ...(data as Omit<Post, 'content'>),
    content,
    slug,
  } as Post
}
