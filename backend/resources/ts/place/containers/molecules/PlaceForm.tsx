import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import PlaceForm from '../../components/molecules/PlaceForm'
import { useCurrentUser } from '../../../user/hooks';


const EnhancedPlaceForm: React.FC = () => {
  
  const user = useCurrentUser();
  // 投稿画像のstateを設定
  const [photos, setPhotos] = useState<File[]>([]);

  return <PlaceForm
    userName={user?.name}
    photos={photos}
    setPhotos={setPhotos}
  />;
};
export default EnhancedPlaceForm