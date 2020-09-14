import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import fs from 'fs'
import path from 'path'

/**
 * @reference https://github.com/vercel/next-plugins/issues/238#issuecomment-432211871
 */
class InlineStylesHead extends Head {
  getCssLinks() {
    return this.__getInlineStyles()
  }

  __getInlineStyles() {
    const { assetPrefix, buildManifest } = this.context

    const files: string[] = []
    for (const key of Object.keys(buildManifest.pages)) {
      if (buildManifest.pages[key]) {
        files.push(...buildManifest.pages[key])
      }
    }

    const removeDuplicates = (arr: string[]) => [...new Set(arr)]

    return removeDuplicates(files)
      .filter(file => /\.css$/.test(file))
      .map(file => (
        <style
          key={file}
          nonce={this.props.nonce}
          data-href={`${assetPrefix}/_next/${file}`}
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(
              path.join(process.cwd(), '.next', file),
              'utf-8'
            ),
          }}
        />
      ))
  }
}

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <InlineStylesHead />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
