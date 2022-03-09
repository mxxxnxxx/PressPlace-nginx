import React from 'react'
import useIntersectionObserver from '../../../layout/hooks/util/useIntersectionObserver'
import useCurrentUser from '../../../user/hooks/useCurrentUser'
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
    const user = useCurrentUser()
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })
    return (
        <FollowUsersPlaces
            paginatePlaces={paginatePlaces?.pages}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            user={user}
        />
    )

}
export default EnhancedFollowUsersPlaces
