import React, { FC } from 'react'
import { useIntersectionObserver } from '../../../layout/hooks/util'
import PlaceCard from '../../components/molecules/PlaceCard'
import { useGetPlaceCardQuery } from '../../hooks'

const EnhancedPlaceCard: FC = () => {
    const {
        isLoading,
        error,
        data: paginatePlaces,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetPlaceCardQuery()
    const statusCode = error?.response?.status

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })

    return (
        <PlaceCard
            paginatePlaces={paginatePlaces?.pages}
            isLoading={isLoading}
            statusCode={statusCode}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
        />
    )
}

export default EnhancedPlaceCard
