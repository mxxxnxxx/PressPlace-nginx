import { UserProfile } from "./userProfile"
// PaginationUsers.tsとの違いは
// data の 型 UserProfileの配列
// フォロー関係あり

export type PaginateFollowUsers = {
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
