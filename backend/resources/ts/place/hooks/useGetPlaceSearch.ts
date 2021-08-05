import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { Inputs } from '../types/Inputs';
import { Places } from '../types/Places';
import getPlaceSearch from './api/getPlaceSearch';



const useGetPlaceSearch = <TData = Places>(
    // 引数
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

export default useGetPlaceSearch;