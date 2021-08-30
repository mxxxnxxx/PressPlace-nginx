import { useQueryClient, UseMutationResult, useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { User } from '../../types/User'
type FormData = {
    email: string
    password: string
    age: number
    name: string
}

const registration = async ({ email, password, name, age }: FormData): Promise<User> => {
    const { data } = await axios.post('/api/register', { email, password, name, age })
    return data
}

const useRegister = (): UseMutationResult<
    User,
    AxiosError,
    FormData,
    undefined
> => {
    const queryClient = useQueryClient()

    return useMutation(registration, {
        onSuccess: (data) => {
            queryClient.setQueryData('user', data)
        },
    })

}
export default useRegister
