import { GetStaticProps } from 'next'
import Router from 'next/router'
import { getAllPosts } from 'src/utils/postUtils'

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts()

  const allTags = posts
    .map(post => post.frontMatter.tags)
    .reduce((acc, cur) => [...acc, ...cur], [])

  const tags = [...new Set(allTags)]

  return {
    props: {
      tags,
    },
  }
}

interface TagsProps {
  tags: string[]
}

function Tags({ tags }: TagsProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Tags</h1>
      <div className="flex space-x-4 flex-wrap">
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-block px-2 py-1 text-sm bg-gray-200 text-gray-600 rounded-sm cursor-pointer"
            onClick={() => Router.push(`/tags/${tag}`)}
          >
            # {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Tags
