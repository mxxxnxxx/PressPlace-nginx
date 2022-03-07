import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { useQuery, UseQueryResult } from 'react-query'
import { UserProfile } from '../types/userProfile'
// ここでuserProfileの方を定義したほうがよさそう
const getUserProfile = async (userName?: string): Promise<UserProfile> => {
    const { data } = await axios.get(`/api/user/info/${userName}`)
    return camelcaseKeys(data, { deep: true })
}

const useGetUserProfileQuery = <TData = UserProfile>(
    userName?: string,
): UseQueryResult<TData, AxiosError> => useQuery(
    'userProfile',
    () => getUserProfile(userName),
    { refetchOnWindowFocus: false, }
)

export default useGetUserProfileQuery
