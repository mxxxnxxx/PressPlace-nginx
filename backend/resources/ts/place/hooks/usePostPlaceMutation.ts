import { UseQueryResult, useQuery, UseQueryOptions, UseMutationResult, useQueryClient, useMutation } from 'react-query'
import axios, { AxiosError } from 'axios'
import { Place } from '../types/Place'
import { toast } from 'react-toastify'

const postPlace = async (formData: FormData): Promise<Place> => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
    const { data } = await axios.post("/api/places", formData, config)
    return data
}

const usePostPlaceQuery = (): UseMutationResult<
    Place,
    AxiosError,
    FormData,
    undefined
> => {
    return useMutation(postPlace, {
        onSuccess: () => {
            toast.info('Placeの投稿に成功しました')
        },
        onError: () => {
            toast.error('Placeの投稿に失敗しました')
        }
    })
}
export default usePostPlaceQuery

