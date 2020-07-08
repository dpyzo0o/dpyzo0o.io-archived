module.exports = function (src) {
  const content = [
    `import Post from 'src/components/Post'`,
    `export { default as getStaticProps } from 'src/utils/getStaticProps'`,
    `export default function PostPage(props) { return <Post {...props} /> }`,
    src,
  ].join('\n\n')

  if (content.includes('<!--more-->')) {
    return this.callback(null, content.split('<!--more-->').join('\n'))
  }

  return this.callback(
    null,
    content.replace(/<!--excerpt-->.*<!--\/excerpt-->/s, '')
  )
}
