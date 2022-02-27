import axios, { AxiosError } from 'axios'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

const logout = async (): Promise<void> => {
    await axios.post('/api/logout')
}

const useLogout = (): UseMutationResult<void, AxiosError, void, undefined> => {
    const queryClient = useQueryClient()

    return useMutation(logout, {
        onSuccess: () => {
            queryClient.removeQueries({
                predicate: (query) => query.queryKey !== 'user',
            })
            queryClient.resetQueries('user')
        },
        onError: () => {
            toast.info('ログアウトに失敗しました｡')
        },
    })
}

export default useLogout
