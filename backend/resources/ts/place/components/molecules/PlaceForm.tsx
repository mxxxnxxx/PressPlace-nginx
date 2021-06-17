import { useForm, FormProvider, useFormContext } from "react-hook-form";
import React, { useState } from 'react';
import usePostPlaceQuery from '../../hooks/usePostPlaceQuery';
import PhotosUpload from "./ImageUp";
import PostalCode from "./PostalCode";
import NewModal from "../organisms/NewModal";
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from "@material-ui/core/styles"
import imageCompression from "browser-image-compression";

// hooks Formの処理 管理しやすするためこのファイルににまとめます
//stateの定義のみEnhancedで定義

// 型定義
type Inputs = {
  name: string
  comment: string
  address: string
  tags: string
  photos?: File[]
};

type Props = {
  photos: File[]
  setPhotos: (files: File[]) => void
  userName?: string
};

const PlaceForm: React.FC<Props> = ({ userName, photos, setPhotos}) => {
  const methods = useForm<Inputs>({
    // 初回バリデーションのタイミング(mode)をonBlurに設定
    mode: "onBlur",
  });
  const { register, errors, handleSubmit, reset, formState, watch } = methods;
  const onSubmit = async (data: Inputs): Promise<void> => {
    // console.log(data);
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
    const compressedPhotoData  = await Promise.all(
      // 一枚一枚の順番を変えないため改めてasyncで処理をハンドリング
      photos.map(async (photo ) => {
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
  // // モーダルの表示非表示
  const [open, setOpen] = useState(false);
  // スタイル
  const useStyles = makeStyles(() =>
    createStyles({
      "dataContainer": {
        borderColor: 'red'
      },
      "photoUpload": {
      },
      "AddressUpload": {},
      "tagsUpload": {},
      "button": {
      },
      "commentContainer": {
        borderColor: 'red'
      }


    }))
  const classes = useStyles();
  // html
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className={classes.dataContainer}>
            <label>場所の名前</label>
            <input
              name="name"
              // refのなかにバリデーションルールを記述
              ref={register({ required: true, maxLength: 30 })}
            // error={errors.name !== undefined}
            />
            {errors.address && <span>文字数は最大30文字です</span>}
          </div>
          <div className={classes.AddressUpload}>
            {/* PostalCodeで値を紐付ける必要がある  */}
            <PostalCode name="address" />
          </div>
          <div className={classes.dataContainer}>
            <label>コメント</label>
            <input
              name="comment"
              ref={register({ required: true, maxLength: 200 })}
            />
            {errors.comment && <span>文字数は最大200文字です</span>}
          </div>
          <div className={classes.photoUpload}>
            {/* propsでphotosのstateをわたす */}
            <PhotosUpload name="photos" photos={photos} setPhotos={setPhotos} />
          </div>

          <div className={classes.tagsUpload}>
            <label>タグ</label>
            <input
              name="tags"
              ref={register()}
            />
          </div>
          <Button variant={'contained'} type="submit" disabled={!formState.isDirty || formState.isSubmitting}>登録</Button>
          <Button type="button" disabled={!formState.isDirty || formState.isSubmitting} onClick={() => reset()}>クリア</Button>
        </form>
      </FormProvider>
      <NewModal open={open} modalOff={(): void => setOpen(false)} />

    </>
  );
};
export default PlaceForm;