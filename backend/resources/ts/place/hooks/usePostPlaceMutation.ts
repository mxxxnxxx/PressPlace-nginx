import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Place } from '../types/Place';
import { MutationError } from '../../layout/types/MutationError';

type PlaceData = {
    title: string;
    content: string;
};

const createPlace = async (PlaceData: PlaceData): Promise<Place> => {
    const { data } = await axios.post('api/places', PlaceData);
    return data;
};

const usePostPlaceMutation = (): UseMutationResult<
    Place,
    AxiosError,
    PlaceData,
    undefined
> => {
    const queryClient = useQueryClient();

    return useMutation(createPlace, {
        onSuccess: () => {
            queryClient.invalidateQueries('places');
        },
        onError: (error) => {
            const mutationError: MutationError = {
                statusCode: error.response?.status,
                errorMessage: 'placeの新規作成に失敗しました。',
            };
            queryClient.setQueryData('error', mutationError);
        },
    });
};

export default usePostPlaceMutation;
