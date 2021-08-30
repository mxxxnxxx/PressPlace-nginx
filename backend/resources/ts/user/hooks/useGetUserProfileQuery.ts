import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query'
import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { UserProfile } from '../types/userProfile'
// ここでuserProfileの方を定義したほうがよさそう
const getUserProfile = async (id?: number): Promise<UserProfile> => {
    const { data } = await axios.get(`/api/user/${id}`)
    return camelcaseKeys(data, { deep: true })
}

const useGetUserProfileQuery = <TData = UserProfile>(
    id?: number,
    options?: UseQueryOptions<UserProfile, AxiosError, TData>
): UseQueryResult<TData, AxiosError> => useQuery('userProfile', () => getUserProfile(id), options)

export default useGetUserProfileQuery
