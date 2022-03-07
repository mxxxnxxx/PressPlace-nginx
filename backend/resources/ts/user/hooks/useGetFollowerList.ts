import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { UseInfiniteQueryOptions, UseInfiniteQueryResult, useInfiniteQuery } from "react-query"
import { PaginateFollowUsers } from "../types/PaginateFollowUsers"


const getFollowerList = async (userName: string, pageParam: number): Promise<PaginateFollowUsers> => {
    const { data } = await axios.get(`/api/user/followers/${userName}?page=${pageParam}`, {
    })
    return camelcaseKeys(data, { deep: true })
}

const useGetFollowerList = <TData = PaginateFollowUsers>(
    userName: string,

): UseInfiniteQueryResult<TData, AxiosError> =>
    useInfiniteQuery('FollowerList', ({ pageParam = 1 }) => getFollowerList(userName, pageParam), {
        getPreviousPageParam: (firstPage) =>
            firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,
        getNextPageParam: (lastPage) =>
            lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
    })

export default useGetFollowerList
