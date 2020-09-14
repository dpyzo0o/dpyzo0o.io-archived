module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    mode: 'all',
    content: ['./src/**/*.{ts,tsx}'],
    options: {
      whitelist: ['anchor'],
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
          // shared by all modifiers
          a: {
            '&:hover': {
              textDecoration: 'none',
            },
            '&.anchor': {
              marginLeft: theme('spacing.2'),
              color: theme('colors.gray.500'),
              opacity: '0',
              textDecoration: 'none',
            },
          },
          span: {
            '&:hover > .anchor': {
              opacity: '1',
            },
          },
          p: {
            textAlign: 'justify',
          },
          // only for this modifier
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
            marginTop: '0',
            marginBottom: '0',
            paddingLeft: theme('spacing.4'),
            paddingRight: theme('spacing.4'),
          },
        },
      },
    }),
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')({ modifiers: ['sm'] })],
}
