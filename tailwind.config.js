module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: {
    content: ['./src/**/*.{ts,tsx}'],
    options: {
      // this class is added by remark plugin
      whitelist: ['heading-anchor'],
    },
  },
  theme: {
    extend: {
      spacing: {
        0.5: '0.125rem',
        1.5: '0.375rem',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
    },
    typography: theme => ({
      default: {
        css: {
          a: {
            color: theme('colors.gray.900'),
            fontWeight: '600',
          },
          pre: {
            marginTop: '0',
            marginBottom: '0',
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
        },
      },
      sm: {
        css: {
          pre: {
            paddingLeft: theme('spacing.4'),
            paddingRight: theme('spacing.4'),
          },
        },
      },
    }),
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
