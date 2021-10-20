import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"

const changeEmail = async (formData: FormData): Promise<boolean> => {
    const { data } = await axios.post('/api/user/email', formData)
    return camelcaseKeys(data, { deep: true })
}

const useChangeEmail = (): UseMutationResult<
    boolean,
    AxiosError,
    FormData,
    undefined
> => {
    return useMutation(changeEmail, {
        onSuccess: () => {
            toast.info('確認メールの送信に成功しました')
            toast.info('受信したメールを確認してください')
        },
        onError: () => {
            toast.error('確認メールの送信に失敗しました')
        }
    })
}

export default useChangeEmail
