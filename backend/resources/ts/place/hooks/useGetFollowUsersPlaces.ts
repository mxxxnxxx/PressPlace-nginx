import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import {
    useInfiniteQuery, UseInfiniteQueryResult
} from 'react-query'
import { Places } from '../types/Places'

// 非同期でplacesを取得
const getPlaceCard = async ({ pageParam = 1 }): Promise<Places> => {
    const { data } = await axios.get(`/api/follow/users/places?page=${pageParam}`)
    // camelcaseKeysでスネークケースをキャメルケースに変換
    // deep opでネストされた深い部分まで変換
    return camelcaseKeys(data, { deep: true })
}


const useGetFollowUsersPlaces = <TData = Places>(): UseInfiniteQueryResult<TData, AxiosError> => {
    return useInfiniteQuery('FollowUsersPlaces', getPlaceCard, {
        getNextPageParam: (lastPage) =>
            lastPage.currentPage && lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
        getPreviousPageParam: (firstPage) =>
            firstPage.currentPage && firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,

        refetchOnWindowFocus: false,
    })
}

export default useGetFollowUsersPlaces
