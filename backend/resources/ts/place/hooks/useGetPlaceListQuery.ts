import {
    UseInfiniteQueryResult,
    UseInfiniteQueryOptions,
    useInfiniteQuery,
} from 'react-query';
import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { Places } from '../types/Places';

// 非同期でplacesを取得
const getPlaceList = async ({ pageParam = 1 }): Promise<Places> => {
    const { data } = await axios.get(`/api/places?page=${pageParam}`);
    // camelcaseKeysでスネークケースをキャメルケースに変換
    // deep opでネストされた深い部分まで変換
    return camelcaseKeys(data, { deep: true });
};


const useGetPlaceListQuery = <TData = Places>(

    options?: UseInfiniteQueryOptions<Places, AxiosError, TData>

): UseInfiniteQueryResult<TData, AxiosError> =>
    useInfiniteQuery('places', getPlaceList, {
        ...options,
        getPreviousPageParam: (firstPage) =>
            firstPage.prevPageUrl ? firstPage.currentPage - 1 : false,
        getNextPageParam: (lastPage) =>
            lastPage.nextPageUrl ? lastPage.currentPage + 1 : false,
    });

export default useGetPlaceListQuery;