import { Box, Button, Card, IconButton, makeStyles, Modal, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { display } from '@material-ui/system';
import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Category } from '../../types/Category';
type Props = {
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    provided: DraggableProvided,
    category: Category,
    onSubmit: (categoryId: number) => void
}
const useStyle = makeStyles((theme) => ({
    modal: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: theme.spacing(50),
        bgcolor: 'background.paper',
        p: 4,
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)
    }
}))
const CategoryDeleteButton: React.FC<Props> = ({
    open,
    handleOpen,
    handleClose,
    provided,
    category,
    onSubmit
}) => {
    const classes = useStyle()
    return (
        <Box
            style={{ display: 'flex', flexDirection: 'row-reverse' }}
            {...provided.dragHandleProps}
        >
            {!(category.name === 'No Category') &&
                <IconButton onClick={() => handleOpen()} className={classes.button} >
                    <ClearIcon />
                </IconButton>
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card className={classes.modal}>
                    <Typography align='center' color='error'>本当に削除してもよろしいですか?</Typography>
                    <Button
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => onSubmit(category.id)}
                    >
                        削除
                    </Button>
                </Card>
            </Modal>
        </Box>
    )
}
export default CategoryDeleteButton
