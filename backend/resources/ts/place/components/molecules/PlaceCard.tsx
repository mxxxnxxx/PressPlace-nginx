import { Box, Card, makeStyles } from '@material-ui/core'
import React, { FC } from 'react'
import { INTERNAL_SERVER_ERROR } from '../../../constants/statusCode'
import GeneralAlert from '../../../layout/components/atoms/GeneralAlert'
import Loding from '../../../layout/components/pages/Loding'
import PlaceCardContent from '../../containers/molecules/PlaceCardContent'
import PlaceCardHeader from '../../containers/molecules/PlaceCardHeader'
import { Place } from '../../types/Place'
import { Places } from '../../types/Places'
import PlaceCardAction from './PlaceCardAction'


type Props = {
    paginatePlaces?: Places[]
    isLoading?: boolean
    statusCode?: number
    loadMoreRef?: (node: Element) => void
    hasNextPage?: boolean
    isFetchingNextPage?: boolean
}
const useStyle = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(5)
    }
}))
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
    const classes = useStyle()
    return (
        <section>
            {paginatePlaces?.map((page) => (
                <React.Fragment key={page.currentPage.toString()}>
                    {page.data.map((place: Place, index) => (
                        <Card className={classes.card} key={index.toString()}>
                            <PlaceCardHeader place={place} />
                            <PlaceCardContent place={place} />
                            <PlaceCardAction place={place} />
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
