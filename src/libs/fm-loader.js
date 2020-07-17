const matter = require('gray-matter')
const stringifyObject = require('stringify-object')

module.exports = function (src) {
  const { content, data } = matter(src)

  if (content.includes('<!--more-->') || content.includes('<!--excerpt-->')) {
    const res = [
      `export const frontMatter = ${stringifyObject(data)}`,
      `export const hasExcerpt = true`,
      content,
    ].join('\n\n')

    return this.callback(null, res)
  }

  const res = [
    `export const frontMatter = ${stringifyObject(data)}`,
    `export const hasExcerpt = false`,
    '<!--more-->',
    content,
  ].join('\n\n')

  return this.callback(null, res)
}
