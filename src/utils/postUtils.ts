import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { FrontMatter, PostInfo } from 'src/types'

export function getAllPosts(): PostInfo[] {
  const POSTS_DIR = path.resolve(process.cwd(), './src/pages/blog')

  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter(file => file.isDirectory())
    .map(file => {
      const slug = file.name
      const filePath = path.join(POSTS_DIR, slug, 'index.mdx')
      const source = fs.readFileSync(filePath, { encoding: 'utf8' })
      const { data } = matter(source)

      const frontMatter = data as FrontMatter

      if (!frontMatter.spoiler) {
        frontMatter.spoiler = ''
      }

      if (!frontMatter.tags) {
        frontMatter.tags = []
      }

      return {
        link: `/blog/${slug}`,
        frontMatter: data as FrontMatter,
      }
    })
}

export function getAllTags(): string[] {
  const posts = getAllPosts()

  const allTags = posts
    .map(post => post.frontMatter.tags)
    .reduce((acc, cur) => [...acc, ...cur], [])

  const tags = [...new Set(allTags)]

  return tags
}
