import axios, { AxiosError } from "axios"
import camelcaseKeys from "camelcase-keys"
import { useQuery, UseQueryResult } from "react-query"

const changedEmail = async (token: string): Promise<string> => {
    const { data } = await axios.get(`/api/user/email/reset/${token}`)
    return camelcaseKeys(data, { deep: true })
}

const useChangedEmail = <TData = string>(
    token: string
): UseQueryResult<TData, AxiosError> =>
    useQuery('changedEmail', () => changedEmail(token))


export default useChangedEmail
