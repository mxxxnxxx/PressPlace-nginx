import { Fab, makeStyles } from '@material-ui/core'
import EventNoteIcon from '@material-ui/icons/EventNote'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        right: 30,
        bottom: 50
    }

}))
const MyPageButton: React.FC = () => {
    const classes = useStyle()
    const history = useHistory()
    return (
        <Fab className={classes.fab} onClick={() => history.push('/mypage/myPlace')}>
            <EventNoteIcon />
        </Fab>
    )
}

export default MyPageButton
