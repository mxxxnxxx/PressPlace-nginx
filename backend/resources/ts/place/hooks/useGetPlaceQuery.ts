import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { useQuery, UseQueryResult } from 'react-query'
import { Place } from '../types/Place'

const getPlace = async (placeId: string): Promise<Place> => {
    const { data } = await axios.get(`/api/place/${placeId}`)
    return camelcaseKeys(data, { deep: true })
}

const useGetPlaceQuery = <TData = Place>(
    placeId: string,
): UseQueryResult<TData, AxiosError> =>
    useQuery('place', () => getPlace(placeId), { refetchOnWindowFocus: false })

export default useGetPlaceQuery
