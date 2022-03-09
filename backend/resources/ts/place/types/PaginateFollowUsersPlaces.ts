import { Place } from './Place'

export type PaginateFollowUsersPlaces = {
    total?: number
    perPage?: number
    currentPage?: number
    lastPage?: number
    firstPageUrl?: string
    lastPageUrl?: string
    nextPageUrl?: string | null
    prevPageUrl?: string | null
    path?: string
    from?: number
    to?: number
    data?: Place[]
    placeId?: string
    message?: string
}
