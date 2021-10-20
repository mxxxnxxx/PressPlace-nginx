import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import FavoritePlaces from '../../components/organisms/FavoritePlaces'
import useGetFavoritePlaces from '../../hooks/useGetFavoritePlacesQuery'

type Props = {
    userName: string
}
const EnhancedFavoritePlaces: React.FC<Props> = ({
    userName
}) => {
    const [page, setPage] = useState<number>(1)
    const queryClient = useQueryClient()
    const {
        data: places,
        error,
        isLoading,
        isPreviousData,
        refetch: getUserPlaces
    } = useGetFavoritePlaces(page, userName)

    useEffect(() => {
        // 2ページ目以降があれば
        if (!(places?.lastPage === page + 1)) {
            queryClient.prefetchQuery(['userPlaces', page + 1], () =>
                getUserPlaces
            )
        }
    }, [page, queryClient])

    return (
        <FavoritePlaces
            places={places}
            error={error}
            isLoading={isLoading}
            isPreviousData={isPreviousData}
            page={page}
            setPage={setPage}
        />
    )

}
export default EnhancedFavoritePlaces
