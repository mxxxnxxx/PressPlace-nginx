import React from 'react'
import { useIntersectionObserver } from '../../../layout/hooks/util'
import FollowerList from '../../components/organisms/FollowerList'
import useGetFollowerList from '../../hooks/useGetFollowerList'

type Props = {
    userName: string
    goToOtherUser: (userName: string) => void
}

const EnhancedFollowerList: React.FC<Props> = ({
    userName,
    goToOtherUser
}) => {
    const {
        isFetching,
        isLoading,
        error,
        data: paginateUsers,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetFollowerList(userName)

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })

    return (
        <FollowerList
            paginateUsers={paginateUsers?.pages}
            isLoading={isLoading}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            goToOtherUser={goToOtherUser}
        />
    )
}
export default EnhancedFollowerList
