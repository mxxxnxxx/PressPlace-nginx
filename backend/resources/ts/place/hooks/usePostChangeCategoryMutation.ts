import axios, { AxiosError } from "axios"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"
import { ChangeCategoryRequest } from "../types/ChangeCategoryRequest"

const postChangeCategory = async (request: ChangeCategoryRequest): Promise<void> => {
    console.log(request);
    await axios.post(
        '/api/category/place/change/changeorder',
        request,
    )
}

const usePostChangeCategoryMutation = (): UseMutationResult<
    void,
    AxiosError,
    ChangeCategoryRequest,
    undefined
> => {
    return useMutation(
        postChangeCategory, {
        onSuccess: () => {
            toast.info('Placeの順番を変更しました')
        },
        onError: () => {
            toast.error('失敗しました｡画面の状態は保存されていません')
        }
    }
    )

}
export default usePostChangeCategoryMutation
