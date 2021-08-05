import React, { useState, useEffect } from 'react';
import { useQueryClient, useQuery, QueryClient } from 'react-query';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import PlaceForm from '../../components/molecules/PlaceForm'
import { useCurrentUser } from '../../../user/hooks';
import imageCompression from "browser-image-compression";
import usePostPlaceQuery from '../../hooks/usePostPlaceQuery';
import { Place } from '../../types/Place';
import { PlaceImage } from '../../types/PlaceImage';

type Inputs = {
  name: string
  comment: string
  address: string
  tag: string
  photos?: File[]
};
type Props = {}
const NewPlaceForm: React.FC<Props> = () => {
  // ログインできてるか確認
  const user = useCurrentUser();
  const history = useHistory();
  const location = useLocation();
  const { from } = (location.state as { from: string }) || {
    from: { pathname: '/' },
  };
  // 投稿画像のstateを設定
  const [photos, setPhotos] = useState<File[]>([]);
  const { error, isLoading, mutate: postPlace } = usePostPlaceQuery();
  const statusCode = error?.response?.status;
  const methods = useForm<Inputs>({ shouldUnregister: false, });

  // PlaceForm.tsxをきょうゆうで利用するためにProps部分のみ定義
  const [oldPlace, setOldPlace] = useState<Place>();
  const [oldPhotos, setOldPhotos] = useState<PlaceImage[]>([]);

  const onSubmit = async (data: Inputs): Promise<void> => {
    const { name, comment, address, tag } = data;
    if (
      name === "" &&
      comment === "" &&
      photos.length === 0
    ) {
      // アンケートフォームが空の場合はPOSTしない
      return;
    }
    // 画像を送信できるようにFormDataに変換する
    const formData = new FormData();
    // appendでformDataにキーと値を追加
    formData.append("name", name);
    formData.append("comment", comment);
    formData.append("address", address);
    formData.append("tags", tag);
    const compressOptions = {
      maxSizeMB: 15,
    };
    // Promise.all で 非同期処理を実行し値を代入
    const compressedPhotoData = await Promise.all(
      // 一枚一枚の順番を変えないため改めてasyncで処理をハンドリング
      photos.map(async (photo) => {
        return {
          blob: await imageCompression(photo, compressOptions),
          name: photo.name
        };
      })
    );

    for (let i = 0; i < compressedPhotoData.length; i++) {
      formData.append("place_image_" + i, compressedPhotoData[i].blob, compressedPhotoData[i].name);
    }
    // axiosを内包したusePostPlaceQueryでpost
    postPlace(formData,
      {
        onSuccess: () => {
          history.replace(from);
        }
      }
    );
  };
  return (
    <FormProvider {...methods}>
      <PlaceForm
        userName={user?.name}
        photos={photos}
        setPhotos={setPhotos}
        onSubmit={onSubmit}
        isLoading={isLoading}
        oldPlace={oldPlace}
        statusCode={statusCode}
        error={error}
        oldPhotos={oldPhotos}
        setOldPhotos={setOldPhotos}
      />
    </FormProvider>
  )
};
export default NewPlaceForm