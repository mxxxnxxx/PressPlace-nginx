import React from 'react'
import { useParams } from 'react-router-dom'
import Loding from '../../../layout/components/pages/Loding'
import PlaceCard from '../../components/organisms/PlaceCard'
import { useGetPlaceQuery } from '../../hooks'

const EnhancedPlaceCard: React.FC = () => {
    const params = useParams<{ placeId: string }>()
    const { data: place, isLoading, isFetching } = useGetPlaceQuery(params.placeId)
    if (isLoading || isFetching) {
        return <Loding isLoading={isLoading} isFetching={isFetching} />
    }
    return (
        <>
            {place &&
                <PlaceCard
                    place={place}
                />
            }

        </>
    )
}
export default EnhancedPlaceCard
