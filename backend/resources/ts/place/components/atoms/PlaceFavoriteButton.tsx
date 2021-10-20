import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Place } from '../../types/Place'
import FlagIcon from '@material-ui/icons/Flag'
import BackspaceIcon from '@material-ui/icons/Backspace'

type Props = {
    place: Place
    buttonState?: boolean
    addFavorite: (placeId: string) => void
    unFavorite: (placeId: string) => void

}
const useStyle = makeStyles(() => ({
    myPlaceButton: {
        textTransform: 'none',
        boxShadow: 'none'
    }
}))
const PlaceFavoriteButton: React.FC<Props> = ({
    place,
    buttonState,
    addFavorite,
    unFavorite,
}) => {
    const classes = useStyle()
    return (
        <>
            {buttonState == undefined &&
                <>
                </>
            }

            {buttonState == false &&
                <Button
                    className={classes.myPlaceButton}
                    startIcon={<FlagIcon />}
                    size='small'
                    variant="contained"
                    onClick={() => addFavorite(place.id)}
                >
                    お気に入りに追加
                </Button>}
            {buttonState == true &&
                <Button
                    className={classes.myPlaceButton}
                    startIcon={<BackspaceIcon />}
                    size='small'
                    variant="contained"
                    onClick={() => unFavorite(place.id)}
                >
                    お気に入りから削除
                </Button>}
        </>
    )
}
export default PlaceFavoriteButton
