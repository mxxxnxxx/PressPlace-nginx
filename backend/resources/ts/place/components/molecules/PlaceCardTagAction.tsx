import { Box, Button, CardActions, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { Place } from "../../types/Place"

type Props = {
    place: Place
    tagSearch: (tag: string) => Promise<void>
}
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'right',
        // ホバー時のエフェクト
        opacity: '0.4',
        borderTop: 'dashed thin',
        transitionDuration: '1s',
        "&:hover": {
            opacity: '1',
        }
    },
    placeTagsLabel: {
        marginRight: theme.spacing(2)
    },
    tagButton: {
        marginTop: theme.spacing(1),
        minWidth: 'min-content',
    }
}))
const PlaceCardTagAction: React.FC<Props> = ({
    place,
    tagSearch
}) => {
    const classes = useStyle()
    return (
        <CardActions
            className={classes.root}
        >
            <Box
                className={classes.placeTagsLabel}
            >
                <Typography>
                    Tag:
                </Typography>
            </Box>
            {place.tags.map((tag, index) => (
                <Button
                    key={index.toString()}
                    variant="outlined"
                    size='small'
                    onClick={() => tagSearch(tag.name)}
                    className={classes.tagButton}
                    classes={{ root: classes.tagButton }}
                >
                    {tag.name}
                </Button>
            ))}
        </CardActions >
    )
}

export default PlaceCardTagAction
