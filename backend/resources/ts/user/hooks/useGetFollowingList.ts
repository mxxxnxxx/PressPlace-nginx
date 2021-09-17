import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult
} from "react-query"
import { FollowUsers } from "../types/FollowUsers"


const getFollowingList = async (userName: string, pageParam: number): Promise<FollowUsers> => {
    const { data } = await axios.get(`/api/user/followings/${userName}?page=${pageParam}`)
    return camelcaseKeys(data, { deep: true })
}

const useGetFollowingList = <TData = FollowUsers>(
    userName: string,
    options?: UseInfiniteQueryOptions<FollowUsers, AxiosError, TData>
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
