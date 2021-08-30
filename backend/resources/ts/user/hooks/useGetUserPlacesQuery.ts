import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query'
import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { Places } from '../../place/types/Places'

const getUserPlaces = async (page: number, id?: number): Promise<Places> => {
    const { data } = await axios.get(`/api/user/places`, {
        params: {
            page: page,
            id: id
        }
    })
    return camelcaseKeys(data, { deep: true })
}
const useGetUserPlaces = <TData = Places>(
    page: number,
    id?: number,
    options?: UseQueryOptions<Places, AxiosError, TData>
): UseQueryResult<TData, AxiosError> => {
    return useQuery(
        ['userPlaces', page],
        () => getUserPlaces(page, id),
        {
            // オプション
            keepPreviousData: true,
            staleTime: 5000
        }
    )
}


export default useGetUserPlaces
