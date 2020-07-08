import Link from 'next/link'

function Header() {
  return (
    <nav className="flex items-center z-20 h-16">
      <Link href="/">
        <a className="flex-1 text-lg font-semibold">dpyzo0o</a>
      </Link>
      <div>
        <Link href="/">
          <a className="px-2 py-2 md:px-4 md:py-3 rounded font-medium">Home</a>
        </Link>
        <Link href="/blog">
          <a className="px-2 py-2 md:px-4 md:py-3 rounded font-medium">Blog</a>
        </Link>
        <Link href="/about">
          <a className="px-2 py-2 md:px-4 md:py-3 rounded font-medium">About</a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
