const path = require('path')

/**
 * 解析 mdx, 支持 frontmatter
 * @param {*} nextConfig
 */
module.exports = function (nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mdx$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {
              remarkPlugins: [
                // add anchor to heading
                require('remark-slug'),
                [
                  require('remark-autolink-headings'),
                  {
                    behavior: 'append',
                    linkProperties: {
                      ariaHidden: true,
                      tabIndex: -1,
                      class: ['heading-anchor'],
                    },
                    content: {
                      type: 'text',
                      value: '#',
                    },
                  },
                ],
              ],
            },
          },
          {
            loader: path.join(__dirname, 'mdx-loader.js'),
          },
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
