import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Place from '../../../place/components/pages/Place';


const EnhancedPlace: FC = () => {
    const { placeId = '' } = useParams<{ placeId?: string }>();
    return <Place placeId={placeId} />;
}
export default EnhancedPlace;