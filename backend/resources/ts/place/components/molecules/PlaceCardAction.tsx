import { Box, Button, CardActions, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { Place } from "../../types/Place"

type Props = {
    place: Place
    tagSearch: (tag: string) => Promise<void>
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
        marginRight: theme.spacing(1)
    },
    tagButton: {
        textTransform: 'none'
    }
}))
const PlaceCardAction: React.FC<Props> = ({
    place,
    tagSearch
}) => {
    const classes = useStyle()
    return (
        <CardActions
            className={classes.root}
        >
            <Box
                className={classes.placeTagsContainer}
            >
                <Box
                    className={classes.placeTagsLabel}
                >
                    <Typography>
                        Tag:
                    </Typography>
                </Box>
                {place.tags.map((tag, index) => (
                    <Box
                        key={index.toString()}
                        className={classes.placeTag}
                    >
                        <Button
                            variant="outlined"
                            size='small'
                            onClick={() => tagSearch(tag.name)}
                            className={classes.tagButton}
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
