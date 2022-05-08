import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { useMutation, UseMutationResult } from 'react-query'
import { toast } from 'react-toastify'
import { Category } from '../types/Category'

const postAddNewCategory = async (name: string): Promise<Category> => {
    const request = {
        name: name
    }
    const { data } = await axios.post("/api/user/category/new", request)
    return camelcaseKeys(data, { deep: true })
}

const usePostAddNewCategoryMutation = (): UseMutationResult<
    Category,
    AxiosError,
    string,
    undefined
> => {
    return useMutation(postAddNewCategory, {
        onSuccess: () => {
            toast.info('カテゴリーの追加に成功しました')
        },
        onError: () => {
            toast.error('カテゴリーの追加に失敗しました')
        }
    })
}
export default usePostAddNewCategoryMutation

