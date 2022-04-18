import { UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Place } from '../types/Place';
import { toast } from 'react-toastify';

const editPostPlace = async (formData: FormData): Promise<Place> => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const { data } = await axios.post(`/api/places/${formData.get('id')}`, formData, config);
    return data
}

const usePostEditPlaceQuery = (): UseMutationResult<
    Place,
    AxiosError,
    FormData,
    undefined
> => {
    return useMutation(editPostPlace, {
        onSuccess: () => {
            toast.info('Placeの更新に成功しました')
        },
        onError: () => {
            toast.error('Placeの更新に失敗しました')
        }
    })
}
export default usePostEditPlaceQuery

