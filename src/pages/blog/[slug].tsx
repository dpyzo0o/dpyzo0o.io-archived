import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import path from 'path'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import MDXComponents from 'src/components/MDXComponents'
import { getPostBySlug, getPostSlugs } from 'src/utils/postsApi'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slugs = getPostSlugs()
  const slugIndex = slugs.findIndex(x => path.parse(x).name === params?.slug)

  const slug = slugs[slugIndex]
  const prevSlug = slugs[slugIndex - 1]
  const nextSlug = slugs[slugIndex + 1]

  const { content, frontMatter } = getPostBySlug(slug, [
    'content',
    'frontMatter',
  ])

  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [
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
      rehypePlugins: [],
    },
    scope: frontMatter,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter,
      prev: prevSlug ? getPostBySlug(prevSlug, ['title', 'slug']) : null,
      next: nextSlug ? getPostBySlug(nextSlug, ['title', 'slug']) : null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPostSlugs()
    .map(path => path.replace(/\.mdx?$/, ''))
    .map(slug => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

type NavInfo = {
  slug: string
  title: string
}

interface PostProps {
  source: string
  frontMatter: { [key: string]: any }
  prev: NavInfo | null
  next: NavInfo | null
}

const Post: React.FC<PostProps> = ({ source, frontMatter, prev, next }) => {
  const content = hydrate(source, { components: MDXComponents })

  return (
    <div className="prose prose-sm post-body max-w-none mx-auto sm:prose ">
      <h1>{frontMatter.title}</h1>
      <React.Fragment>{content}</React.Fragment>
      <nav className="flex justify-between flex-wrap list-none">
        <div>
          {prev && (
            <Link href={`/blog/${prev.slug}`}>
              <a>← {prev.title}</a>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link href={`/blog/${next.slug}`}>
              <a>{next.title} →</a>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Post
