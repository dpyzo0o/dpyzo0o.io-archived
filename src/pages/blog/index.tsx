import { GetStaticProps } from 'next'
import PostPreview from 'src/components/PostPreview'
import { PostInfo } from 'src/types'
import { getAllPosts } from 'src/utils/postUtils'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: getAllPosts(),
    },
  }
}

interface BlogProps {
  posts: PostInfo[]
}

function Blog({ posts }: BlogProps) {
  if (posts.length === 0) {
    return <div className="container">No posts...</div>
  }

  return (
    <div className="container">
      {posts.map(({ link, frontMatter: { title, date, spoiler } }) => (
        <PostPreview
          key={link}
          title={title}
          date={date}
          spoiler={spoiler}
          link={link}
        />
      ))}
    </div>
  )
}

export default Blog
