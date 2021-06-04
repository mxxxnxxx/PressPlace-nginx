import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Place } from '../types/Place';

const getPlace = async (placeId: string): Promise<Place> => {
    const { data } = await axios.get(`/api/places/${placeId}`);
    return data;
};

const useGetPlaceQuery = <TData = Place>(
    placeId: string,
    options?: UseQueryOptions<Place, AxiosError, TData>
): UseQueryResult<TData, AxiosError> =>
    useQuery(['place', placeId], () => getPlace(placeId), options);

export default useGetPlaceQuery;