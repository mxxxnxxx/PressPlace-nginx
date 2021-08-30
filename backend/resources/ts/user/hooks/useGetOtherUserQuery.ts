import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { User } from '../types/User'

const getOtherUser = async (userId: number): Promise<User> => {
    console.log(userId);
    const { data } = await axios.get(`/api/other/${userId}`)
    return camelcaseKeys(data)
}

const useGetOtherUserQuery = (): UseMutationResult<
    User,
    AxiosError,
    number,
    undefined
> => {
    const queryClient = useQueryClient()
    return useMutation(getOtherUser,
        {
            onSuccess: (data) => {
                queryClient.setQueryData('otherUser', data)
            }
        }
    )
}
export default useGetOtherUserQuery
