export type User = {
  userName: string
  email: string
  avatarUrl: string
  password: string
}

export type Film = {
  name: string
  description: string
  postDate: Date
  genre: string
  releaseYear: number
  rating: number
  previewVideoLink: string
  videoLink: string
  starring: string[]
  director: string
  runTime: number
  commentsCount: number
  user: User
  posterImage: string
  bgImage: string
  bgColor: string
}
