import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { UserProfile } from '../types/userProfile'
// ここでuserProfileの方を定義したほうがよさそう
const getUserProfile = async (userName?: string): Promise<UserProfile> => {
    const { data } = await axios.get(`/api/user/info/${userName}`)
    return camelcaseKeys(data, { deep: true })
}

const useGetUserProfileQuery = <TData = UserProfile>(
    userName?: string,
    options?: UseQueryOptions<UserProfile, AxiosError, TData>
): UseQueryResult<TData, AxiosError> => useQuery('userProfile', () => getUserProfile(userName), options)

export default useGetUserProfileQuery
