import React, { FC, useEffect } from 'react'
import Places from '../../components/pages/Places'


const EnhancedPlaces: FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return <Places />
}
export default EnhancedPlaces
