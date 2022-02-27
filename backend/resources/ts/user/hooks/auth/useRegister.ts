import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { useMutation, UseMutationResult, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { User } from '../../types/User'
type FormData = {
    email: string
    password: string
    age: number
    name: string
}

const registration = async ({ email, password, name, age }: FormData): Promise<User> => {
    const { data } = await axios.get('/sanctum/csrf-cookie').then(
        () => axios.post('/api/register', { email, password, name, age })
    )
    console.log(data);
    return camelcaseKeys(data, { deep: true })
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
            toast.info(`${data}さんご登録ありがとうございます!!`)
        },
    })

}
export default useRegister
