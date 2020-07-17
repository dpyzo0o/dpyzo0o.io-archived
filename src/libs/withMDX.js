const path = require('path')

/**
 * 解析 mdx, 支持 frontmatter, excerpt
 * @param {*} nextConfig
 */
module.exports = function (nextConfig = {}) {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(md|mdx)$/,
        oneOf: [
          {
            resourceQuery: /excerpt/,
            use: [
              options.defaultLoaders.babel,
              '@mdx-js/loader',
              {
                loader: path.join(__dirname, 'excerpt-loader.js'),
              },
              {
                loader: path.join(__dirname, 'fm-loader.js'),
              },
            ],
          },
          {
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
                          class: ['anchor'],
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
              {
                loader: path.join(__dirname, 'fm-loader.js'),
              },
            ],
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
