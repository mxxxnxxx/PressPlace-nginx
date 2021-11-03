import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"
import { Places } from '../types/Places'

const getFavoritePlaces = async (page: number, userName?: string): Promise<Places> => {
    const { data } = await axios.get(`/api/user/favorite/places`, {
        params: {
            userName: userName,
            page: page,
        }
    })
    return camelcaseKeys(data, { deep: true })
}

const useGetFavoritePlaces = <TData = Places>(
    page: number,
    userName?: string,
    options?: UseQueryOptions<Places, AxiosError, TData>
): UseQueryResult<TData, AxiosError> => {
    return useQuery(
        ['favoritePlaces', page],
        () => getFavoritePlaces(page, userName),
        {
            // オプション
            keepPreviousData: true,
            staleTime: 5000
        }
    )
}

export default useGetFavoritePlaces
