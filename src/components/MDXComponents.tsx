import { Components } from '@mdx-js/react'
import CodeBlock from './CodeBlock'

export default {
  h2: ({ children, ...props }) => (
    <h2 {...props}>
      <span>{children}</span>
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 {...props}>
      <span>{children}</span>
    </h3>
  ),
  pre: props => props.children,
  code: CodeBlock,
} as Components
