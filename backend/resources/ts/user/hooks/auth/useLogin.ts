import { useQueryClient, UseMutationResult, useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { User } from '../../types/User'
import camelcaseKeys from 'camelcase-keys'
import { toast } from 'react-toastify'

type FormData = {
    email: string
    password: string
}

const login = async (formData: FormData): Promise<User> => {

    const { data } = await axios.get('/sanctum/csrf-cookie').then(
        () => axios.post('/api/login', formData)
    )

    return camelcaseKeys(data, { deep: true })
}

const useLogin = (): UseMutationResult<
    User,
    AxiosError,
    FormData,
    undefined
> => {

    return useMutation(login, {
        onSuccess: (data) => {
            toast.info(`${data}さんがログインしました!!`)
        },
        onError: (data) => {
            toast.info(data)
        }
    })
}

export default useLogin
