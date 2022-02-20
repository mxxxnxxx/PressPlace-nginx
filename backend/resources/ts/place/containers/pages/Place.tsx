import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Place from '../../components/pages/Place'
import { useGetPlaceQuery } from '../../hooks'

const EnhancedPlace: React.FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Place
        />
    )
}
export default EnhancedPlace
