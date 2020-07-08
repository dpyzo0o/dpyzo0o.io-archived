const path = require('path')

module.exports = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.mdx$/,
      oneOf: [
        {
          resourceQuery: /excerpt/,
          use: [
            options.defaultLoaders.babel,
            '@mdx-js/loader',
            {
              loader: path.resolve(
                __dirname,
                './src/loaders/excerpt-loader.js'
              ),
            },
            {
              loader: path.resolve(__dirname, './src/loaders/fm-loader.js'),
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
              loader: path.resolve(__dirname, './src/loaders/mdx-loader.js'),
            },
            {
              loader: path.resolve(__dirname, './src/loaders/fm-loader.js'),
            },
          ],
        },
      ],
    })

    return config
  },
}
