import React, { FC } from 'react'
import useIntersectionObserver from '../../../layout/hooks/util/useIntersectionObserver'
import PlaceCards from '../../components/organisms/PlaceCards'
import useGetPlaceCardQuery from '../../hooks/useGetPlaceCardQuery'


const EnhancedPlaceCards: FC = () => {
    {
        const {
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
            <PlaceCards
                paginatePlaces={paginatePlaces?.pages}
                statusCode={statusCode}
                loadMoreRef={loadMoreRef}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />
        )
    }
}
export default EnhancedPlaceCards
