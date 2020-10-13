import { GetStaticProps } from 'next'
import Link from 'next/link'
import { PostMeta } from 'src/types'
import { getAllPosts } from 'src/utils/postsApi'

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts(['slug', 'title', 'date', 'spoiler'])

  return {
    props: {
      posts,
    },
  }
}

interface BlogProps {
  posts: PostMeta[]
}

export default function Blog({ posts }: BlogProps) {
  if (posts.length === 0) {
    return <div className="container">No posts...</div>
  }

  return (
    <div className="container">
      {posts.map(({ title, slug, date, spoiler }) => (
        <article key={slug} className="mb-8">
          <h2>
            <Link href={`/blog/${slug}`}>
              <a className="text-2xl font-bold">{title}</a>
            </Link>
          </h2>
          <div className="mt-2 text-sm text-gray-700 font-medium">
            {new Date(date).toLocaleDateString()}
          </div>
          <div className="prose max-w-none py-4">{spoiler}</div>
        </article>
      ))}
    </div>
  )
}
