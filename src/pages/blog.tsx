import Link from 'next/link'
import getAllPosts from 'src/utils/getAllPosts'

const posts = getAllPosts()

function Blog() {
  if (posts.length === 0) {
    return <div className="container">No posts...</div>
  }

  return (
    <div className="container">
      {posts.map(
        ({
          link,
          module: { frontMatter, hasExcerpt, default: ExcerptComponent },
        }) => (
          <article key={link} className="mb-8">
            <h2>
              <Link href={link}>
                <a className="text-2xl font-bold">{frontMatter.title}</a>
              </Link>
            </h2>
            <div className="mt-2 text-sm text-gray-700 font-medium">
              {frontMatter.date.toLocaleDateString()}
            </div>
            {hasExcerpt && (
              <div className="prose max-w-none py-4">
                <ExcerptComponent />
              </div>
            )}
          </article>
        )
      )}
    </div>
  )
}

export default Blog
