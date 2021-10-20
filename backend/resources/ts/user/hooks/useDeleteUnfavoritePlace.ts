import axios, { AxiosError } from "axios"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"

const DeleteUnfavoritePlace = async (placeId: string): Promise<boolean> => {
    const { data } = await axios.delete(`/api/places/${placeId}/unfavorite`)
    return data
}

const useDeleteUnfavoritePlace = (): UseMutationResult<
    boolean,
    AxiosError,
    string,
    undefined
> => {
    return useMutation(DeleteUnfavoritePlace,
        {
            onSuccess: () => {
                toast.info('MyPlaceから削除しました')
            },
            onError: () => {
                toast.error('MyPlaceの削除に失敗しました')
            },
        }
    )
}
export default useDeleteUnfavoritePlace
