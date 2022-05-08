import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Avatar, IconButton, Typography, Button, makeStyles } from '@material-ui/core'
import BlurOffIcon from '@material-ui/icons/BlurOff'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'
import { useHistory } from 'react-router-dom'
import PlaceGoogleMap from '../../containers/molecules/PlaceGoogleMap'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}
const useStyle = makeStyles((theme) => ({
    droppable: {
        padding: theme.spacing(2),
        borderRadius: '6px',
        background: 'rgba(211,211,211,0.8)',
        width: '300px',
        flexShrink: 0,
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(10),
    },
    categoryName: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(1)
    },
    placeContainer: {
        marginBottom: theme.spacing(2)
    },
    placeName: {
        alignSelf: 'center',
    },
    AccordionDLabel: {
        fontStyle: 'italic',
        color: 'Silver',
        fontSize: '0.8rem',
    }
}))
const PlaceAccordion: React.FC<Props> = ({
    place
}) => {
    const history = useHistory()
    const classes = useStyle()
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header"
            >
                <div>
                    <IconButton aria-label="place-image" onClick={() => history.push(`/place/${place.id}`)}>
                        {place.placeImages.length > 0 ?
                            <Avatar src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${place.placeImages[0]?.imagePath}`} />
                            :
                            <BlurOffIcon />
                        }
                    </IconButton>
                </div>
                <div className={classes.placeName}>
                    <Typography>{place.name}</Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div>
                    <Typography className={classes.AccordionDLabel}>-comment-</Typography>
                    <Typography>{place.comment}</Typography>
                </div>
            </AccordionDetails>
            <AccordionActions>
                <PlaceGoogleMap place={place} />
                <Button size="small" onClick={() => history.push(`/place/edit/${place.id}`)}>編集</Button>
            </AccordionActions>
        </Accordion>
    )
}
export default PlaceAccordion
