import { Places } from "../../place/types/Places"
import { User } from "./User"

export type UserProfile = {
    user: User
    loginUserId: boolean
    countFollowings: number
    countFollowers: number
    followState: boolean
}
