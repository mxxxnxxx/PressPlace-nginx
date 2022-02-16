import { Button, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import FlagIcon from '@material-ui/icons/Flag'
import React from 'react'
import { Place } from '../../types/Place'

type Props = {
    place: Place
    buttonState?: boolean
    addFavorite: (placeId: number) => void
    unFavorite: (placeId: number) => void

}
const useStyle = makeStyles((theme) => ({
    myPlaceButton: {
        textTransform: 'none',
        boxShadow: 'none',
        padding: '4px 4px',
        [theme.breakpoints.up('sm')]: {
            padding: '4px 10px'
        }
    },
    favoriteText: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    startIcon: {
        marginRight: '0px',
        [theme.breakpoints.up('sm')]: {
            marginRight: '8px',
        }
    },
    endIcon: {
        marginLeft: '0px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '8px',
        }
    },
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
                    classes={{
                        startIcon: classes.startIcon,
                        endIcon: classes.endIcon
                    }}
                    startIcon={<FlagIcon />}
                    endIcon={<AddIcon />}
                    size='small'
                    variant="contained"
                    onClick={() => addFavorite(place.id)}
                >
                    <span className={classes.favoriteText}>お気に入り</span>
                </Button>}
            {buttonState == true &&
                <Button
                    className={classes.myPlaceButton}
                    classes={{
                        startIcon: classes.startIcon,
                        endIcon: classes.endIcon
                    }}
                    startIcon={<FlagIcon />}
                    endIcon={<ClearIcon />}
                    size='small'
                    variant="contained"
                    onClick={() => unFavorite(place.id)}
                >
                    <span className={classes.favoriteText}>お気に入り</span>
                </Button>}
        </>
    )
}
export default PlaceFavoriteButton
