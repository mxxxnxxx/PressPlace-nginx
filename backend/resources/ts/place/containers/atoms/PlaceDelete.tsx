import React, { useState } from 'react';
import PlaceDelete from '../../components/atoms/PlaceDelete';
import { Place } from '../../types/Place';
type Props = {
    place: Place
}

const EnhancedPlaceDelete: React.FC<Props> = ({ place }) => {
    const [deleteModalOn, setDeleteModalOn] = useState<boolean>(false);
    return (
        <PlaceDelete
            deleteModalOn={deleteModalOn}
            setDeleteModalOn={setDeleteModalOn}
            place={place}
        />
    )
}
export default EnhancedPlaceDelete