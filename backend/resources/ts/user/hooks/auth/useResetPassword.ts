import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"

const resetPassword = async (formData: FormData): Promise<string> => {
    const { data } = await axios.post('/api/password/reset', formData)
    return camelcaseKeys(data, { deep: true })
}
const useResetPassword = (): UseMutationResult<
    string,
    AxiosError,
    FormData,
    undefined
> => {
    return useMutation(resetPassword, {
        onSuccess: () => {
            toast.info('パスワードの変更に成功しました')
        },
        onError: () => {
            toast.error('パスワードの変更に失敗しました')
        }
    })
}

export default useResetPassword
