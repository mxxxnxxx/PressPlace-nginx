import axios, { AxiosError } from "axios"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"
import { PlacesQuery } from "../types/PlacesQuery"

const postOrderNumberUpdate = async (placesQuery: PlacesQuery): Promise<void> => {
    const request = {
        placesQuery: placesQuery
    }
    await axios.post(
        '/api/category/place/changeorder',
        request,
    )
}

const usePostOrderNumberUpdateMutation = (): UseMutationResult<
    void,
    AxiosError,
    PlacesQuery,
    undefined
> => {
    return useMutation(
        postOrderNumberUpdate, {
        onSuccess: () => {
            toast.info('Placeの順番を変更しました')
        },
        onError: () => {
            toast.error('失敗しました｡画面の状態は保存されていません')
        }
    }
    )

}
export default usePostOrderNumberUpdateMutation
