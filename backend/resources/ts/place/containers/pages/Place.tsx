import React, { useEffect } from 'react'
import Place from '../../components/pages/Place'

const EnhancedPlace: React.FC = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Place />
    )
}
export default EnhancedPlace
