import axios, { AxiosError } from "axios"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import { toast } from "react-toastify"

const followUser = async (userId: number): Promise<boolean> => {
    const { data } = await axios.post(`/api/user/${userId}/unfollow`)
    return data
}
const usePostFollowUser = (): UseMutationResult<
    boolean,
    AxiosError,
    number,
    undefined
> => {
    const queryClient = useQueryClient()
    return useMutation(
        followUser, {
        onSuccess: (data) => {
            queryClient.setQueryData('followState', data)
            toast('フォローしました')
        },
        onError: () => {
            toast('フォローに失敗しまさいた')
        }
    })
}

export default usePostFollowUser
