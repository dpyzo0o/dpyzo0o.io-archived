import { getAllPosts } from 'src/utils/postUtils'

export default function getStaticProps() {
  const posts = getAllPosts().map(post => ({
    title: post.frontMatter.title,
    link: post.link,
  }))

  return {
    props: { posts },
  }
}
