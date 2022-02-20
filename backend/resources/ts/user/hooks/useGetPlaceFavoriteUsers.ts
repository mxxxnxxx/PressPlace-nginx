import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { UseInfiniteQueryOptions, UseInfiniteQueryResult, useInfiniteQuery } from "react-query"
import { PaginateFollowUsers } from "../types/PaginateFollowUsers"


const getPlaceFavoriteUsers = async (placeId: string, { pageParam = 1 }): Promise<PaginateFollowUsers> => {
    const { data } = await axios.get(`/api/place/favorite/users/${placeId}?page=${pageParam}`, {
    })
    return camelcaseKeys(data, { deep: true })
}

const useGetPlaceFavoriteUsers = <TData = PaginateFollowUsers>(
    placeId: string,
    options?: UseInfiniteQueryOptions<PaginateFollowUsers, AxiosError, TData>

): UseInfiniteQueryResult<TData, AxiosError> =>
    useInfiniteQuery('PlaceFavoriteUsers', ({ pageParam = 1 }) => getPlaceFavoriteUsers(placeId, pageParam), {
        ...options,
        getPreviousPageParam: (firstPage) =>
            firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,
        getNextPageParam: (lastPage) =>
            lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
    })

export default useGetPlaceFavoriteUsers
