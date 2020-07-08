import React from 'react'
import { Components } from '@mdx-js/react'
import CodeBlock from './CodeBlock'

interface HeaderLinkProps {
  tag: keyof JSX.IntrinsicElements
}

const HeaderLink: React.FC<HeaderLinkProps> = ({
  tag: Tag,
  children,
  ...props
}) => (
  <Tag {...props} className="heading">
    {children}
  </Tag>
)

interface CustomLinkProps {
  href?: string
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, ...props }) => {
  const re = /^https?:\/\//
  const isExternal = props.href && re.test(props.href)

  if (isExternal) {
    return (
      <a target="_blank" {...props}>
        {children}
      </a>
    )
  }

  return <a {...props}>{children}</a>
}

export default {
  h2: ({ children, ...props }) => (
    <HeaderLink tag="h2" {...props}>
      {children}
    </HeaderLink>
  ),
  h3: ({ children, ...props }) => (
    <HeaderLink tag="h3" {...props}>
      {children}
    </HeaderLink>
  ),
  h4: ({ children, ...props }) => (
    <HeaderLink tag="h4" {...props}>
      {children}
    </HeaderLink>
  ),
  h5: ({ children, ...props }) => (
    <HeaderLink tag="h5" {...props}>
      {children}
    </HeaderLink>
  ),
  h6: ({ children, ...props }) => (
    <HeaderLink tag="h6" {...props}>
      {children}
    </HeaderLink>
  ),
  a: ({ children, ...props }) => <CustomLink {...props}>{children}</CustomLink>,
  pre: props => props.children,
  code: CodeBlock,
} as Components
