const withOptimizedImages = require('next-optimized-images')
const withMDX = require('./src/libs/withMDX')

module.exports = withOptimizedImages(
  withMDX({
    pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  })
)
