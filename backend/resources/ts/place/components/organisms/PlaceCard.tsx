import { Box, Card } from '@material-ui/core'
import React, { FC } from 'react'
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode'
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert'
import Loding from '../../../layout/components/pages/Loding'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
import PlaceCardContent from '../molecules/PlaceCardContent'
import PlaceCardMedia from '../molecules/PlaceCardMedia'


type Props = {
    paginatePlaces?: Places[]
    isLoading?: boolean
    statusCode?: number
    loadMoreRef?: (node: Element) => void
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
}

const PlaceCard: FC<Props> = ({
    paginatePlaces,
    isLoading,
    statusCode,
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
}) => {
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }

    if (statusCode) {
        return (
            <>
                <Box height={48} px={2} />
                {statusCode === INTERNAL_SERVER_ERROR && (
                    <GeneralAlert
                        type="error"
                        title="サーバエラー"
                        content="予期しないエラーが発生し、placeの取得に失敗しました。恐れ入りますが時間をおいて再度お試しください。"
                    />
                )}
            </>
        )
    }

    let loadMoreMessage
    if (isFetchingNextPage) {
        loadMoreMessage = '読み込み中...'
    } else {
        loadMoreMessage = hasNextPage ? '続きを読み込む' : ' '
    }

    return (
        <section>
            {paginatePlaces?.map((page) => (
                <React.Fragment key={page.currentPage.toString()}>
                    {page.data.map((place: Place, index) => (
                        <Card className='m-5' key={index.toString()}>

                            <PlaceCardHeader place={place} />

                            <PlaceCardMedia place={place} />

                            <PlaceCardContent place={place} />
                        </Card>
                    ))}
                </React.Fragment>
            ))}
            <Box {...{ ref: loadMoreRef }} textAlign="center">
                {loadMoreMessage}
            </Box>
        </section>
    )
}

export default PlaceCard
