import { UseQueryResult, useQuery, UseQueryOptions, UseMutationResult, useQueryClient, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Place } from '../types/Place';

const postPlace = async (formData: FormData): Promise<Place> => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post("/api/places", formData, config);
    return data;
}

const usePostPlaceQuery = (): UseMutationResult<
    Place,
    AxiosError,
    FormData,
    undefined
> => {
    const queryClient = useQueryClient();
    return useMutation(postPlace, {
        onSuccess: (data) => {
        }
    })
 }
    export default usePostPlaceQuery

