import React, { FC } from 'react'
import Loding from '../../../layout/components/pages/Loding'
import { useIntersectionObserver } from '../../../layout/hooks/util'
import PlaceCards from '../../components/organisms/PlaceCards'
import { useGetPlaceCardQuery } from '../../hooks'

const EnhancedPlaceCards: FC = () => {
    const {
        isLoading,
        error,
        data: paginatePlaces,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetPlaceCardQuery()
    const statusCode = error?.response?.status

    // 無限スクロール処理
    const { loadMoreRef } = useIntersectionObserver({
        onIntersect: fetchNextPage,
        enabled: hasNextPage,
    })
    if (isLoading || isFetching) {
        return <Loding isLoading={isLoading} isFetching={isFetching} />
    }
    return (
        <PlaceCards
            paginatePlaces={paginatePlaces?.pages}
            statusCode={statusCode}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
        />
    )
}

export default EnhancedPlaceCards
