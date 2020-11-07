const matter = require('gray-matter')
const stringifyObject = require('stringify-object')

module.exports = function (src) {
  const { content, data: frontMatter } = matter(src)

  if (!frontMatter.tags) {
    frontMatter.tags = []
  }

  const res = [
    `import Post from 'src/components/Post'`,
    content,
    `export const frontMatter = ${stringifyObject(frontMatter)}`,
    `export { default as getStaticProps } from 'src/utils/getStaticProps'`,
    `export default function PostPage(props) { return <Post {...props} /> }`,
  ].join('\n\n')

  return this.callback(null, res)
}
