import { Place } from "../../place/types/Place"
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
    deletedAt: Date | null
    favoritePlaces: Place[]
    errors: object

}
