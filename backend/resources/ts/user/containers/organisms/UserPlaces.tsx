import React, { FC, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import UserPlaces from "../../components/organisms/UserPlaces"
import useGetUserPlaces from "../../hooks/useGetUserPlacesQuery"

type Props = {
    userId?: number
}
const EnhancedUserPlaces: FC<Props> = ({ userId }) => {
    const [page, setPage] = useState<number>(1)
    const queryClient = useQueryClient()
    const {
        data: places,
        error,
        isLoading,
        isPreviousData,
        refetch: getUserPlaces
    } = useGetUserPlaces(page, userId)
    useEffect(() => {
        // 2ページ目以降があれば
        if (!(places?.lastPage === page + 1)) {
            queryClient.prefetchQuery(['userPlaces', page + 1], () =>
                getUserPlaces
            )
        }
    }, [page, queryClient])
    return (
        <UserPlaces
            places={places}
            error={error}
            isLoading={isLoading}
            isPreviousData={isPreviousData}
            page={page}
            setPage={setPage}
        />
    )
}
export default EnhancedUserPlaces
