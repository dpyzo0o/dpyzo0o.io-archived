const withPlugins = require('next-compose-plugins')
const withOptimizedImages = require('next-optimized-images')
const withMDX = require('./src/libs/withMDX')

module.exports = withPlugins([[withOptimizedImages], [withMDX]], {
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
})
