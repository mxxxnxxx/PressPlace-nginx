import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import useIntersectionObserver from '../../../layout/hooks/util/useIntersectionObserver'
import PlaceFavoriteUsers from '../../components/organisms/PlaceFavoriteUsers'
import useGetPlaceFavoriteUsers from '../../hooks/useGetPlaceFavoriteUsers'

const EnhancedPlaceFavoriteUsers: React.FC = () => {
    const params = useParams<{ placeId: string }>()
    const placeId = params.placeId
    const history = useHistory()
    const goToUserPage = (userName: string) => {
        history.push(`/account/${userName}/favoritePlace`)
    }
    const {
        data: usersInf,
        isLoading,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useGetPlaceFavoriteUsers(placeId)

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })
    return (
        <PlaceFavoriteUsers
            paginateUsers={usersInf?.pages}
            isLoading={isLoading}
            goToUserPage={goToUserPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            loadMoreRef={loadMoreRef}
        />
    )
}
export default EnhancedPlaceFavoriteUsers
