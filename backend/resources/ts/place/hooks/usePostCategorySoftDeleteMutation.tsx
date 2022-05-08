import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"
import { CategoriesArray } from "../types/CategoriesArray"
type CategoryDeleteQuery = {
    categoryId: number,
    placeIds: number[]
}
const postCategorySoftDelete = async (request: CategoryDeleteQuery): Promise<CategoriesArray> => {

    const { data } = await axios.post(
        '/api/category/delete',
        request,
    )
    return camelcaseKeys(data, { deep: true })
}

const usePostCategorySoftDeleteMutation = (): UseMutationResult<
    CategoriesArray,
    AxiosError,
    CategoryDeleteQuery,
    undefined
> => {
    return useMutation(
        postCategorySoftDelete, {
        onSuccess: () => {
            toast.info('カテゴリーの削除に成功しました')
        },
        onError: () => {
            toast.error('カテゴリーの削除に失敗しました｡画面の状態は保存されていません')
        }
    }
    )

}
export default usePostCategorySoftDeleteMutation
