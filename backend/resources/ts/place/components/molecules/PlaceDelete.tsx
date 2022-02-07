import {
    Button,
    MenuItem, Modal
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import React from 'react'
import PlaceDeleteModal from '../../containers/organisms/PlaceDeleteModal'
import { Place } from '../../types/Place'
type Props = {
    deleteModalOn: boolean
    setDeleteModalOn: (boolean: boolean) => void
    place: Place
    handleClose: () => void
}
const PlaceDelete: React.FC<Props> = ({
    deleteModalOn,
    setDeleteModalOn,
    place,
    handleClose
}) => {

    return (
        <>
            <MenuItem>
                <Button
                    onClick={() => setDeleteModalOn(true)}
                    startIcon={<DeleteForeverIcon />}
                >
                    削除
                </Button>
            </MenuItem>

            {/* 以下からモーダル */}
            <Modal
                open={deleteModalOn}
                onClose={handleClose}
            >
                <>
                    <PlaceDeleteModal
                        placeId={place.id}
                        handleClose={handleClose}
                    />
                </>

            </Modal>
        </>
    )
}
export default PlaceDelete
