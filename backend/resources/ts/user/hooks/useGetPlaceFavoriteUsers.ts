import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query"
import { PaginateFollowUsers } from "../types/PaginateFollowUsers"


const getPlaceFavoriteUsers = async (placeId: string, { pageParam = 1 }): Promise<PaginateFollowUsers> => {
    const { data } = await axios.get(`/api/place/favorite/users/${placeId}?page=${pageParam}`, {
    })
    return camelcaseKeys(data, { deep: true })
}

const useGetPlaceFavoriteUsers = <TData = PaginateFollowUsers>(
    placeId: string,

): UseInfiniteQueryResult<TData, AxiosError> =>
    useInfiniteQuery('PlaceFavoriteUsers', ({ pageParam = 1 }) => getPlaceFavoriteUsers(placeId, pageParam), {
        getPreviousPageParam: (firstPage) =>
            firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,
        getNextPageParam: (lastPage) =>
            lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
    })

export default useGetPlaceFavoriteUsers
