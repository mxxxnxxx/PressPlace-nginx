import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query'
import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { Places } from '../../place/types/Places'

const getUserPlaces = async (page: number, userName?: string): Promise<Places> => {
    const { data } = await axios.get(`/api/user/places`, {
        params: {
            userName: userName,
            page: page,
        }
    })
    return camelcaseKeys(data, { deep: true })
}
const useGetUserPlaces = <TData = Places>(
    page: number,
    userName?: string,
): UseQueryResult<TData, AxiosError> => {
    return useQuery(
        ['userPlaces', page],
        () => getUserPlaces(page, userName),
        {
            // オプション
            keepPreviousData: true,
            staleTime: 5000,
            refetchOnWindowFocus: false,
        }
    )
}


export default useGetUserPlaces
