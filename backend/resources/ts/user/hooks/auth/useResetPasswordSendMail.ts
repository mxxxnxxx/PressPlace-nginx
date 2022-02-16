import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { useMutation, UseMutationResult } from "react-query"
import { toast } from "react-toastify"

const resetPasswordSendMail = async (formData: FormData): Promise<string> => {
    const { data } = await axios.post("/api/password/email", formData)
    return camelcaseKeys(data, { deep: true })
}
const useResetPasswordSendMail = (): UseMutationResult<
    string,
    AxiosError,
    FormData,
    undefined
> => {
    return (useMutation(resetPasswordSendMail, {
        onSuccess: () => {
            toast.info('パスワードリセット用のリンクをメールアドレス宛に送信しました')
        },
        onError: () => {
            toast.error('確認メールの送信に失敗しました')
        }
    }))
}
export default useResetPasswordSendMail
