import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import PlaceCardHeader from '../../components/molecules/PlaceCardHeader';
import { Place } from "../../types/Place";

type Props = {
    place: Place
}
const EnhancedPlaceCardHeader: React.FC<Props> = ({ place }) => {
    const history = useHistory()
    const queryClient = useQueryClient()
    const goToOtherUser = useCallback(
        (userName: string) => {

            if (userName) {
                queryClient.setQueryData('otherUserId', userName)
                history.push(`/account/${userName}/myPlace`)
            }
        }, [])

    return (
        <PlaceCardHeader
            place={place}
            goToOtherUser={goToOtherUser}
        />
    )
}
export default EnhancedPlaceCardHeader
