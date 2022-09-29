export type User = {
  userName: string
  email: string
  avatarUrl: string
  password: string
}

export type Film = {
  name: string
  description: string
  posted: Date
  genre: string
  released: number
  rating: number
  previewVideoLink: string
  videoLink: string
  starring: string[]
  director: string
  runTime: number
  commentsAmount: number
  user: User
  posterImage: string
  backgroundImage: string
  backgroundColor: string
}
