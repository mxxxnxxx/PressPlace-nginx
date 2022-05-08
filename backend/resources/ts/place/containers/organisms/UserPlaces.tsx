// 現在利用していません
import React, { FC, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import Loding from "../../../layout/components/pages/Loding"
import UserPlaces from "../../../user/components/organisms/UserPlaces"
import useGetUserPlaces from "../../../user/hooks/useGetUserPlacesQuery"

type Props = {
    userName?: string
}
const EnhancedUserPlaces: FC<Props> = ({ userName }) => {
    const [page, setPage] = useState<number>(1)
    const queryClient = useQueryClient()
    const {
        data: places,
        error,
        isLoading,
        isFetching,
        isPreviousData,
        refetch: getUserPlaces
    } = useGetUserPlaces(page, userName)

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
