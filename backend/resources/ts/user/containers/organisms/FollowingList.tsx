import React, { useState } from 'react'
import { useIntersectionObserver } from '../../../layout/hooks/util'
import FollowingList from '../../components/organisms/FollowingList'
import useGetFollowingList from '../../hooks/useGetFollowingList'

type Props = {
    userName: string
    goToOtherUser: (userName: string) => void
}

const EnhancedFollowingList: React.FC<Props> = ({
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
    } = useGetFollowingList(userName)

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })

    return (
        <FollowingList
            paginateUsers={paginateUsers?.pages}
            isLoading={isLoading}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            goToOtherUser={goToOtherUser}
        />
    )
}
export default EnhancedFollowingList
