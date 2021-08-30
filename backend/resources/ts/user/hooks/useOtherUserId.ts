import { useQueryClient } from 'react-query'

const useOtherUserId = (): number | undefined => {
    const queryClient = useQueryClient()
    return queryClient.getQueryData('otherUserId')
}

export default useOtherUserId
