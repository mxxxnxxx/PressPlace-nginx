import { useQueryClient } from 'react-query'
import { User } from '../types/User'

// ログイン：User  非ログイン時：null  デフォルト：undefined
const useGetCurrentUser = (): User | null | undefined => {
    const queryClient = useQueryClient()
    return queryClient.getQueryData('user')
}

export default useGetCurrentUser
