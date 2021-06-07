export type User = {
  id: number
  name: string
  authType: 'Social' | 'Mail'
  email: string
  emailVerifiedAt: boolean
  age: number
  userImage: HTMLImageElement
  introduction: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
