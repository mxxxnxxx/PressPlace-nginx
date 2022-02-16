import { UserProfile } from "./userProfile"

export type FollowUsers = {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPageUrl: string
    lastPageUrl: string
    nextPageUrl: string | null
    prevPageUrl: string | null
    path: string
    from: number
    to: number
    data: UserProfile[]
    userId: string
}
