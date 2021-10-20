import { Box, Button, CardActions, makeStyles, Typography } from "@material-ui/core"
import useTheme from '@material-ui/core/styles/useTheme'
import React from "react"
import { Place } from "../../types/Place"

type Props = {
    place: Place
}
const useStyle = makeStyles((theme) => ({
    root: {
        opacity: '0.4',
        justifyContent: 'right',
        borderTop: 'dashed thin',
        transitionDuration: '1s',
        "&:hover": {
            opacity: '1',
        }
    },
    placeTagsContainer: {
        display: 'flex',

    },
    placeTagsLabel: {
        alignSelf: 'center',
        marginRight: theme.spacing(2)
    },
    placeTag: {

    }
}))
const PlaceCardAction: React.FC<Props> = ({ place }) => {
    const classes = useStyle()
    const theme = useTheme()
    return (
        <CardActions className={classes.root}>
            <Box className={classes.placeTagsContainer}>
                <Box className={classes.placeTagsLabel}>
                    <Typography >
                        Tag
                    </Typography>
                </Box>
                {place.tags.map((tag, index) => (
                    <Box className={classes.placeTag} key={index.toString()}>
                        <Button
                            variant="outlined"
                            style={{ marginRight: theme.spacing(2) }}
                        >
                            {tag.name}
                        </Button>
                    </Box>
                ))}
            </Box>
        </CardActions >
    )
}

export default PlaceCardAction
