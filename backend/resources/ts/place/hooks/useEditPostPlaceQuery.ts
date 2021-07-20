import {  UseMutationResult, useQueryClient, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Place } from '../types/Place';

const editPostPlace = async (formData: FormData): Promise<Place> => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(`/api/places/${formData.get('id')}`, formData, config);
    return data;
}

const useEditPostPlaceQuery = (): UseMutationResult<
    Place,
    AxiosError,
    FormData,
    undefined
> => {
    const queryClient = useQueryClient();
    return useMutation(editPostPlace, {
        onSuccess: (data) => {
        }
    })
}
export default useEditPostPlaceQuery

