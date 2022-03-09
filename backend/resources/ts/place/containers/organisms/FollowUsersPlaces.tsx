import React from 'react'
import useIntersectionObserver from '../../../layout/hooks/util/useIntersectionObserver'
import FollowUsersPlaces from '../../components/organisms/FollowUsersPlaces'
import useGetFollowUsersPlaces from '../../hooks/useGetFollowUsersPlaces'

const EnhancedFollowUsersPlaces: React.FC = () => {
    const {
        error,
        data: paginatePlaces,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetFollowUsersPlaces()
    const statusCode = error?.response?.status
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })
    return (
        <FollowUsersPlaces
            paginatePlaces={paginatePlaces?.pages}
            statusCode={statusCode}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
        />
    )

}
export default EnhancedFollowUsersPlaces
