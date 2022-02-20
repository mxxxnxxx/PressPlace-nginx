import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import Loding from '../../../layout/components/pages/Loding'
import FavoritePlaces from '../../components/organisms/FavoritePlaces'
import useGetFavoritePlaces from '../../hooks/useGetFavoritePlacesQuery'

type Props = {
    userName?: string
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
        isFetching,
        isPreviousData,
        refetch: getUserPlaces
    } = useGetFavoritePlaces(page, userName, {
        // オプション
        keepPreviousData: true,
        staleTime: 5000,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        // 2ページ目以降があれば
        if (!(places?.lastPage === page + 1)) {
            queryClient.prefetchQuery(['userPlaces', page + 1], () =>
                getUserPlaces
            )
        }
    }, [page, queryClient])
    if (isLoading || isFetching) {
        return <Loding isLoading={isLoading} isFetching={isFetching} />
    }
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
