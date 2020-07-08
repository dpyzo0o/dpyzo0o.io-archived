import Link from 'next/link'

interface PostPreviewProps {
  link: string
  title: string
  date: string
  spoiler: string
}

function PostPreview({ link, title, date, spoiler }: PostPreviewProps) {
  return (
    <article key={link} className="mb-8">
      <h2>
        <Link href={link}>
          <a className="text-2xl font-bold">{title}</a>
        </Link>
      </h2>
      <div className="mt-2 text-sm text-gray-700 font-medium">
        {new Date(date).toLocaleDateString()}
      </div>
      <div className="max-w-none py-4 text-gray-700">{spoiler}</div>
    </article>
  )
}

export default PostPreview
