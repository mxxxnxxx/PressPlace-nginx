import { Places } from "../../place/types/Places"
export type User = {
    id: number
    name: string
    email: string
    emailVerifiedAt: boolean | null
    age: number
    userImage: string
    introduction: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    errors: object
}
