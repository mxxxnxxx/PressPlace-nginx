import { useQueryClient, UseMutationResult, useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Provider, OAuthParams } from '../../types/OAuth'
import { User } from '../../types/User'

const socialLogin = async (
    provider: Provider,
    authParams: OAuthParams
): Promise<User> => {
    const { data } = await axios.post(
        `/api/login/${provider}/callback`,
        authParams
    )
    return data
}

const useSocialLogin = (): UseMutationResult<
    User,
    AxiosError,
    { provider: Provider; authParams: OAuthParams },
    undefined
> => {
    const queryClient = useQueryClient()

    return useMutation(
        ({ provider, authParams }) => socialLogin(provider, authParams),
        {
            onSuccess: (data) => {
                queryClient.setQueryData('user', data)
            },
        }
    )
}

export default useSocialLogin
