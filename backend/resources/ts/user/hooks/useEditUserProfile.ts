import axios, { AxiosError } from 'axios'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { User } from '../types/User'
import useCurrentUser from './useCurrentUser'

type EditPost = {
    formData: FormData
    userId: number
}
const editUserProfile = async ({ formData, userId }: EditPost): Promise<User> => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    console.log(...formData.entries());
    const { data } = await axios.post(`/api/user/${userId} `, formData, config)
    return data
}

const useEditUserProfile = (): UseMutationResult<
    User,
    AxiosError,
    EditPost,
    undefined
> => {
    const queryClient = useQueryClient()
    return useMutation(editUserProfile, {
        onSuccess: (data) => {
            queryClient.setQueryData('user', data)
            toast.info('アカウントプロフィールの更新に成功しました')
        },
        onError: () => {
            toast.error('アカウントプロフィールの更新に失敗しました')
        }
    })
}
export default useEditUserProfile

