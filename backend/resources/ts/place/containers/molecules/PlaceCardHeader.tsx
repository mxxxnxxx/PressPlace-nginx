import React, { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useCurrentUser } from '../../../user/hooks';
import { User } from '../../../user/types/User';
import PlaceCardHeader from '../../components/molecules/PlaceCardHeader';
import { Place } from "../../types/Place";

type Props = {
    place: Place
}
const EnhancedPlaceCardHeader: React.FC<Props> = ({ place }) => {
    const history = useHistory()
    const currentUser = useCurrentUser()
    const queryClient = useQueryClient()
    const goToUserPage = useCallback(
        (userName: string, currentUserName?: string) => {
            if (userName === currentUserName) {
                history.push(`/mypage/myPlace`)
            } else {
                queryClient.setQueryData('otherUserId', userName)
                history.push(`/account/${userName}/myPlace`)
            }
        }, [])

    return (
        <PlaceCardHeader
            place={place}
            currentUser={currentUser}
            goToUserPage={goToUserPage}
        />
    )
}
export default EnhancedPlaceCardHeader
