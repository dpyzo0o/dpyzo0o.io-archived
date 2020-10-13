import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import githubTheme from 'prism-react-renderer/themes/github'
import rangeParser from 'src/utils/parseNumericRange'

/**
 * @reference https://prince.dev/highlight-with-react
 * @param meta metastring from MDXProvider
 */
function createHighlightLineChecker(meta: string): (idx: number) => boolean {
  return index => {
    const RE = /{([\d,-]+)}/
    const res = RE.exec(meta)
    if (res) {
      const lineNumbers = rangeParser(res[1])
      return lineNumbers.includes(index + 1)
    } else {
      return false
    }
  }
}

function getCodeBlockTitle(meta: string) {
  const RE = /\[(.*?)\]/
  const res = RE.exec(meta)
  return res && res[1]
}

function CodeBlock(props: any) {
  let { children, className, metastring } = props
  const language = className?.replace(/language-/, '')

  const shouldHighlightLine = createHighlightLineChecker(metastring)
  const codeBlockTitle = getCodeBlockTitle(metastring)

  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={githubTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        let newStyle = { ...style }

        if (codeBlockTitle) {
          newStyle.marginTop = '0'
          newStyle.borderTopLeftRadius = '0'
          newStyle.borderTopRightRadius = '0'
        }

        return (
          <React.Fragment>
            {codeBlockTitle && (
              <div className="bg-gray-400 rounded-t-md px-4 sm:px-6 py-1 sm:py-2 font-semibold">
                {codeBlockTitle}
              </div>
            )}
            <div className="overflow-auto">
              <pre
                className={`${className} ${
                  codeBlockTitle ? 'rounded-b-md' : 'rounded-md'
                } float-left min-w-full`}
                style={newStyle}
              >
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i })

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} relative bg-gray-200 -mx-4 px-4 sm:-mx-6 sm:px-6`
                  }

                  return (
                    <div key={i} {...lineProps}>
                      {shouldHighlightLine(i) && (
                        <div className="absolute left-0 w-0.5 sm:w-1 h-full bg-gray-500" />
                      )}
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </pre>
            </div>
          </React.Fragment>
        )
      }}
    </Highlight>
  )
}

export default CodeBlock
