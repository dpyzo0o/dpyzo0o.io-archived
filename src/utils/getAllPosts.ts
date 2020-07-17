import { FrontMatter } from 'src/types'

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map(fileName => ({
    link: fileName.substr(1).replace(/\/index\.(md|mdx)$/, ''),
    module: r<{
      frontMatter: FrontMatter
      hasExcerpt: boolean
      default: React.ComponentType
    }>(fileName),
  }))
}

export default function getAllPosts() {
  return importAll(
    require.context('../pages/?excerpt', true, /\.(md|mdx)$/)
  ).sort(
    (a, b) =>
      b.module.frontMatter.date.getTime() - a.module.frontMatter.date.getTime()
  )
}
