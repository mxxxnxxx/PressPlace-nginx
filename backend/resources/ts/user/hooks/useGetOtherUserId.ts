import { useQueryClient } from 'react-query'

const useGetOtherUserId = (): number | undefined => {
    const queryClient = useQueryClient()
    return queryClient.getQueryData('otherUserId')
}

export default useGetOtherUserId
