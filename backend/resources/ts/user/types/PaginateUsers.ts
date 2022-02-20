import { User } from "./User"
// PaginationFollowUsers.tsとの違いは
// data の 型 Userの配列
// フォロー関係なし


export type PaginateUsers = {
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
    data: User[]
    userId: string
}
