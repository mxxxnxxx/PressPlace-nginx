import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult
} from "react-query"
import { PaginateFollowUsers } from "../types/PaginateFollowUsers"


const getFollowingList = async (userName: string, pageParam: number): Promise<PaginateFollowUsers> => {
    const { data } = await axios.get(`/api/user/followings/${userName}?page=${pageParam}`)
    return camelcaseKeys(data, { deep: true })
}

const useGetFollowingList = <TData = PaginateFollowUsers>(
    userName: string,
    options?: UseInfiniteQueryOptions<PaginateFollowUsers, AxiosError, TData>
): UseInfiniteQueryResult<TData, AxiosError> =>
    useInfiniteQuery('FollowingList', ({ pageParam = 1 }) => getFollowingList(userName, pageParam), {
        ...options,
        getPreviousPageParam: (firstPage) =>
            firstPage.prevPageUrl ? firstPage.currentPage - 1 : false
        ,

        getNextPageParam: (lastPage) =>
            lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
    })

export default useGetFollowingList
