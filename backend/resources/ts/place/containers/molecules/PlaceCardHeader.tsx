import React from 'react';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import useGetOtherUserQuery from '../../../user/hooks/useGetOtherUserQuery';
import PlaceCardHeader from '../../components/molecules/PlaceCardHeader';
import { Place } from "../../types/Place"

type Props = {
    place: Place
}
const EnhancedPlaceCardHeader: React.FC<Props> = ({ place }) => {
    const history = useHistory()
    const queryClient = useQueryClient()
    const goToOtherUser = useCallback(
        (userId: number) => {

            if (userId) {
                queryClient.setQueryData('otherUserId', userId)
                history.push("/account/others")
            }
        }, [])

    return (
        <PlaceCardHeader place={place} goToOtherUser={goToOtherUser} />
    )
}
export default EnhancedPlaceCardHeader
