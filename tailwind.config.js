module.exports = {
  purge: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
      },
      lineHeight: {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem',
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
          // code: {
          //   color: theme('colors.gray.700'),
          //   backgroundColor: theme('colors.gray.100'),
          //   borderColor: theme('colors.gray.300'),
          //   borderWidth: theme('borderWidth.default'),
          //   borderRadius: theme('borderRadius.md'),
          //   paddingTop: theme('spacing.1'),
          //   paddingRight: theme('spacing[1.5]'),
          //   paddingBottom: theme('spacing.1'),
          //   paddingLeft: theme('spacing[1.5]'),
          //   '&::before': {
          //     display: 'none',
          //   },
          //   '&::after': {
          //     display: 'none',
          //   },
          // },
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
