import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntersectionObserver } from '../../../layout/hooks/util'
import PlaceCard from '../../components/organisms/PlaceCard'
import { useGetPlaceCardQuery } from '../../hooks'

type Props = {}

const EnhancedPlaceCard: FC<Props> = () => {
    const {
        isFetching,
        isLoading,
        error,
        data: paginatePlaces,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetPlaceCardQuery()
    const history = useHistory()
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
