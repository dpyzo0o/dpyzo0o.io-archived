import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { FrontMatter, PostMeta } from 'src/types'
import components from './MDXComponents'

interface PostProps {
  frontMatter: FrontMatter
  hasExcerpt: boolean
  posts: PostMeta[]
  children?: React.ReactNode
}

function Post({ frontMatter, posts, children }: PostProps) {
  const router = useRouter()
  const postIndex = posts.findIndex(post => post.link === router.pathname)
  const prev = posts[postIndex - 1]
  const next = posts[postIndex + 1]

  return (
    <div className="prose prose-sm max-w-none sm:prose sm:max-w-none mx-auto">
      <h1>{frontMatter.title}</h1>
      <MDXProvider components={components}>{children}</MDXProvider>
      <nav className="flex justify-between flex-wrap list-none">
        <div>
          {prev && (
            <Link href={prev.link}>
              <a>← {prev.title}</a>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={next.link}>
              <a>{next.title} →</a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Post
