import { UseQueryResult, useQuery, UseQueryOptions, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { User } from '../types/User'

const getLoginUser = async (): Promise<User> => {
    const { data } = await axios.get('/api/user/me')
    return camelcaseKeys(data)
}

const useGetUserQuery = <TData = User>(
): UseQueryResult<TData, AxiosError> => {
    const queryClient = useQueryClient()
    return useQuery('user', getLoginUser, {
        retry: 0,
        initialData: undefined,
        onError: () => {
            queryClient.setQueryData('user', null)
        },
    }
    )
}

export default useGetUserQuery
