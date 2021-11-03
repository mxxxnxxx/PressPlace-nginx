import axios, { AxiosError } from "axios"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"

const AddFavoritePlace = async (placeId: number): Promise<boolean> => {
    const { data } = await axios.post(`/api/places/${placeId}/favorite`)
    return data
}

const useAddFavoritePlace = (): UseMutationResult<
    boolean,
    AxiosError,
    number,
    undefined
> => {
    return useMutation(AddFavoritePlace,
        {
            onSuccess: () => {
                toast.info('MyPlaceに追加しました')
            },
            onError: () => {
                toast.error('MyPlaceの追加に失敗しました')
            }
        }
    )
}
export default useAddFavoritePlace
