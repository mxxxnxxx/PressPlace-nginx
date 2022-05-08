import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { useQuery, UseQueryResult } from 'react-query'
import { CategoriesArray } from '../types/CategoriesArray'

const getCategoriesPlaces = async (): Promise<CategoriesArray> => {
    const { data } = await axios.get("/api/user/category")
    return camelcaseKeys(data, { deep: true })
}

const useGetCategoriesPlacesQuery = <TData = CategoriesArray>(
): UseQueryResult<TData, AxiosError> =>
    useQuery('CategoriesArray', () => getCategoriesPlaces(), { refetchOnWindowFocus: false })

export default useGetCategoriesPlacesQuery
