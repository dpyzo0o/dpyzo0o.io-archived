import { GetStaticPaths, GetStaticProps } from 'next'
import { PostInfo } from 'src/types'
import { getAllPosts, getAllTags } from 'src/utils/postUtils'
import PostPreview from 'src/components/PostPreview'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.slug as string
  const postsByTag = getAllPosts().filter(post =>
    post.frontMatter.tags.includes(tag)
  )

  return {
    props: {
      tag,
      posts: postsByTag,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags()

  return {
    paths: tags.map(tag => ({
      params: {
        slug: tag,
      },
    })),
    fallback: false,
  }
}

interface TagProps {
  tag: string
  posts: PostInfo[]
}

function Tag({ tag, posts }: TagProps) {
  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-8"># {tag}</h1>
      {posts.map(({ link, frontMatter: { title, date, spoiler } }) => (
        <PostPreview title={title} date={date} spoiler={spoiler} link={link} />
      ))}
    </div>
  )
}

export default Tag
