export interface FrontMatter {
  title: string
  date: string
  spoiler: string
}

export interface PostMeta extends FrontMatter {
  slug: string
}
