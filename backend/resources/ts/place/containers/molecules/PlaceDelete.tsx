import React, { useState } from 'react'
import PlaceDelete from '../../components/molecules/PlaceDelete'
import { Place } from '../../types/Place'
type Props = {
    place: Place
}

const EnhancedPlaceDelete: React.FC<Props> = ({ place }) => {
    const [deleteModalOn, setDeleteModalOn] = useState<boolean>(false)
    const handleClose = () => setDeleteModalOn(false)
    return (
        <PlaceDelete
            deleteModalOn={deleteModalOn}
            setDeleteModalOn={setDeleteModalOn}
            place={place}
            handleClose={handleClose}
        />
    )
}
export default EnhancedPlaceDelete
