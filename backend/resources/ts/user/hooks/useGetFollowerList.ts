import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { UseInfiniteQueryOptions, UseInfiniteQueryResult, useInfiniteQuery } from "react-query"
import { FollowUsers } from "../types/FollowUsers"


const getFollowerList = async (userName: string, pageParam: number): Promise<FollowUsers> => {
    const { data } = await axios.get(`/api/user/followers/${userName}?page=${pageParam}`, {
    })
    return camelcaseKeys(data, { deep: true })
}

const useGetFollowerList = <TData = FollowUsers>(
    userName: string,
    options?: UseInfiniteQueryOptions<FollowUsers, AxiosError, TData>

): UseInfiniteQueryResult<TData, AxiosError> =>
    useInfiniteQuery('FollowerList', ({ pageParam = 1 }) => getFollowerList(userName, pageParam), {
        ...options,
        getPreviousPageParam: (firstPage) =>
            firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,
        getNextPageParam: (lastPage) =>
            lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
    })

export default useGetFollowerList
