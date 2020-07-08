import { AppProps } from 'next/app'
import Layout from 'src/components/Layout'
import 'src/styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
