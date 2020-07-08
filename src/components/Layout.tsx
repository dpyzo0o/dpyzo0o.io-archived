import Header from './Header'
import Footer from './Footer'
import Container from './Container'

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="min-h-screen relative pb-12 sm:pb-16">
      <Container>
        <Header />
      </Container>
      <Container>
        <main className="py-4 sm:py-8">{children}</main>
      </Container>
      <Footer />
    </div>
  )
}

export default Layout
