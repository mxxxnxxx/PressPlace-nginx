import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import qs from 'qs'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { Inputs } from '../types/Inputs'
import { Places } from '../types/Places'
type Params = {
    page: number
    InputsData: {
        name: string | undefined
        address: string | undefined
        comment: string | undefined
        $tag: string[] | undefined
    }
}
const getPlaceSearch = async (page: number, InputsData?: Inputs): Promise<Places> => {

    const params = {
        page: page,
        InputsData: {
            name: InputsData?.name,
            address: InputsData?.address,
            comment: InputsData?.comment,
            tags: InputsData?.tag
        },
    }
    const paramsSerializer = (params: Params) => qs.stringify(params)
    const { data } = await axios.get(`/api/places/search`, { params, paramsSerializer })
    const camelcaseData = camelcaseKeys(data, { deep: true })
    return camelcaseData

}
const useGetPlaceSearch = <TData = Places>(
    page: number,
    InputsData?: Inputs,
    options?: UseQueryOptions<Places, AxiosError, TData>
): UseQueryResult<TData, AxiosError> => {
    return useQuery(
        ['PlaceSearched', page],
        () => getPlaceSearch(page, InputsData),
        {
            // オプション
            keepPreviousData: true,
            staleTime: 5000
        }
    )
}

export default useGetPlaceSearch
