import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_DIR = path.join(process.cwd(), 'posts')

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_DIR)
}

export function getRawPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, slug)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return matter(fileContents)
}

export function getPostBySlug(slug: string, fields?: string[]) {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const { content, data } = getRawPostBySlug(slug)

  if (!fields) {
    return {
      slug: realSlug,
      content,
      ...data,
    }
  }

  type BlogPost = {
    [key: string]: any
  }

  const items: BlogPost = {}

  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }

    if (field === 'content') {
      items[field] = content
    }

    if (field === 'frontMatter') {
      items[field] = data
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields?: string[]) {
  return getPostSlugs()
    .map(slug => getPostBySlug(slug, fields))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
