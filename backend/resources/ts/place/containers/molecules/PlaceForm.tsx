import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import PlaceForm from '../../components/molecules/PlaceForm'
import { useCurrentUser } from '../../../user/hooks';
import imageCompression from "browser-image-compression";
import usePostPlaceQuery from '../../hooks/usePostPlaceQuery';

type Inputs = {
  name: string
  comment: string
  address: string
  tags: string
  photos?: File[]
};
type Props = {
  handleFormClose: () => void
}
const EnhancedPlaceForm: React.FC<Props> = ({ handleFormClose }) => {
  // ログインできてるか確認
  const user = useCurrentUser();
  // 投稿画像のstateを設定
  const [photos, setPhotos] = useState<File[]>([]);
  // const statusCode = error?.response?.status;
  const onSubmit = async (data: Inputs): Promise<void> => {
    const { name, comment, address, tags } = data;
    if (
      name === "" &&
      comment === "" &&
      tags === "" &&
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
    formData.append("tags", tags);
    const compressOptions = {
      // 3MB以下に圧縮する
      maxSizeMB: 3,
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


    // 以下 一枚の写真しか送れなかったもの
    // forEachで圧縮した写真データphotoDataとして渡し一つずつformDataに入れる
    // compressedPhotoData.forEach((photoData) => {
    //   formData.append("place_image", photoData.blob, photoData.name);
    // });
    // 以下はlaravel側に直前のデータ
    console.log(...formData.entries());

    // axiosを内包したusePostPlaceQueryでpost
    usePostPlaceQuery(formData);
  };
  return <PlaceForm
    userName={user?.name}
    photos={photos}
    setPhotos={setPhotos}
    onSubmit={onSubmit}
    handleFormClose={handleFormClose}
  // statusCode={statusCode}
  />;
};
export default EnhancedPlaceForm