import axios, { AxiosError } from "axios"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"
import { ColumnOrderUpdateRequest } from "../types/ColumnOrderUpdateRequest"

const PostColumnOrderUpdate = async (categoriesQuery: ColumnOrderUpdateRequest): Promise<void> => {
    const request = {
        categoriesQuery: categoriesQuery
    }
    await axios.post(
        '/api/category/change/changeorder',
        request,
    )
}

const usePostColumnOrderUpdateMutation = (): UseMutationResult<
    void,
    AxiosError,
    ColumnOrderUpdateRequest,
    undefined
> => {
    return useMutation(
        PostColumnOrderUpdate, {
        onSuccess: () => {
            toast.info('Placeの順番を変更しました')
        },
        onError: () => {
            toast.error('失敗しました｡画面の状態は保存されていません')
        }
    }
    )

}
export default usePostColumnOrderUpdateMutation
