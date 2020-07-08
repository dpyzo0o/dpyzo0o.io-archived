import getAllPosts from './getAllPosts'
import { PostMeta } from 'src/types'

export default function getStaticProps() {
  const posts: PostMeta[] = getAllPosts().map(post => ({
    title: post.module.frontMatter.title,
    link: post.link,
  }))

  return {
    props: { posts },
  }
}
