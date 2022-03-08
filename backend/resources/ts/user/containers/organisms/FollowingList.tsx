import React, { useState } from 'react'
import Loding from '../../../layout/components/pages/Loding'
import useIntersectionObserver from '../../../layout/hooks/util/useIntersectionObserver'
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
        data: paginateFollowUsers,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetFollowingList(userName)

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })
    if (isLoading || isFetching) {
        return <Loding isLoading={isLoading} isFetching={isFetching} />
    }
    return (
        <FollowingList
            paginateFollowUsers={paginateFollowUsers?.pages}
            isLoading={isLoading}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            goToOtherUser={goToOtherUser}
        />
    )
}
export default EnhancedFollowingList
