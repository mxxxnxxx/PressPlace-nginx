import React, { FC, useEffect } from 'react'
import useCurrentUser from '../../../user/hooks/useGetCurrentUser'
import Places from '../../components/pages/Places'


const EnhancedPlaces: FC = () => {
    const user = useCurrentUser()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return <Places user={user} />
}
export default EnhancedPlaces
