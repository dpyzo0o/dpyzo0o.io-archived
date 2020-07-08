export interface FrontMatter {
  title: string
  date: string
  spoiler: string
  tags: string[]
}

export interface PostInfo {
  link: string
  frontMatter: FrontMatter
}

export interface PostNavInfo {
  title: string
  link: string
}
