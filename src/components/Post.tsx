import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { FrontMatter, PostNavInfo } from 'src/types'
import components from './MDXComponents'

interface PostProps {
  frontMatter: FrontMatter
  hasExcerpt: boolean
  posts: PostNavInfo[]
  children?: React.ReactNode
}

function Post({ frontMatter, posts, children }: PostProps) {
  const router = useRouter()
  const postIndex = posts.findIndex(post => post.link === router.pathname)
  const prev = posts[postIndex - 1]
  const next = posts[postIndex + 1]

  return (
    <div className="prose prose-sm post-body max-w-none mx-auto sm:prose">
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
      <div className="flex space-x-2 text-sm text-gray-800 flex-wrap mt-6">
        {frontMatter.tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-sm font-medium bg-gray-200 text-gray-600 cursor-pointer"
            onClick={() => router.push(`/tags/${tag}`)}
          >
            # {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Post
