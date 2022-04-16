import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult
} from 'react-query'
import { Places } from '../types/Places'

// 非同期でplacesを取得
const getPlaceCard = async ({ pageParam = 1 }): Promise<Places> => {
    const { data } = await axios.get(`/api/places?page=${pageParam}`)
    // camelcaseKeysでスネークケースをキャメルケースに変換
    // deep opでネストされた深い部分まで変換
    return camelcaseKeys(data, { deep: true })
}


const useGetPlaceCardsQuery = <TData = Places>(
): UseInfiniteQueryResult<TData, AxiosError> => {
    return useInfiniteQuery('places', getPlaceCard, {
        // 次のデータが有るか判断
        // ページがあれば+1して次のページがひょうじされる
        getNextPageParam: (lastPage) =>
            lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
        getPreviousPageParam: (firstPage) =>
            firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,

        // ウインドウフォーカス時に再取得される処理を無効
        refetchOnWindowFocus: false,
    })
}

export default useGetPlaceCardsQuery
