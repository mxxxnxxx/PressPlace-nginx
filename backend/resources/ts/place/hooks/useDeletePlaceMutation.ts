import { UseMutationResult, useQueryClient, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import Place from '../components/pages/Place';
import { toast } from 'react-toastify';


const deletePlace = async (id: number) => {
    const { data } = await axios.get(`/api/places/delete/${id}`);
    return data;
}

const useDeletePlaceQuery = () => {
    const queryClient = useQueryClient();
    return useMutation(deletePlace, {
        onSuccess: () => {
            queryClient.invalidateQueries('places')
            toast.info('Placeを削除しました')

        },
        onError: () => {
            toast.error('Placeを削除できませんでした')
        }
    })
}
export default useDeletePlaceQuery

