import imageCompression from "browser-image-compression"
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import useCurrentUser from "../../../user/hooks/useCurrentUser"
import NewPlaceForm from '../../components/organisms/NewPlaceForm'
import usePostPlaceQuery from '../../hooks/usePostPlaceMutation'

// Controlled Component での FormではコンポーネントをまたぐとPropsの管理が困難になるので
// react-hook-form を採用しFormProviderでコンポーネント間を管理

type Inputs = {
    name: string
    comment: string
    address: string
    tag: string
    photos?: File[]
}

const EnhancedNewPlaceForm: React.FC = () => {
    // ログインできてるか確認
    const user = useCurrentUser()
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/' }
    }
    // 投稿画像のstateを設定
    const [photos, setPhotos] = useState<File[]>([])
    const photoCount = photos.length
    const { error, isLoading, mutate: postPlace } = usePostPlaceQuery()
    const statusCode = error?.response?.status
    const methods = useForm<Inputs>({ shouldUnregister: false, })

    const onSubmit = async (data: Inputs): Promise<void> => {
        const { name, comment, address, tag } = data
        if (
            name === "" &&
            comment === "" &&
            photos.length === 0
        ) {
            // アンケートフォームが空の場合はPOSTしない
            return
        }
        // 画像を送信できるようにFormDataに変換する
        const formData = new FormData()
        // appendでformDataにキーと値を追加
        formData.append("name", name)
        formData.append("comment", comment)
        formData.append("address", address)
        formData.append("tags", tag)
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
                }
            })
        )

        for (let i = 0; i < compressedPhotoData.length; i++) {
            formData.append("place_image_" + i, compressedPhotoData[i].blob, compressedPhotoData[i].name)
        }
        // axiosを内包したusePostPlaceQueryでpost
        postPlace(formData,
            {
                onSuccess: () => {
                    history.replace(from)
                }
            }
        )
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <FormProvider {...methods}>
            <NewPlaceForm
                userName={user?.name}
                photos={photos}
                setPhotos={setPhotos}
                onSubmit={onSubmit}
                isLoading={isLoading}
                statusCode={statusCode}
                error={error}
                photoCount={photoCount}
            />
        </FormProvider>
    )
};
export default EnhancedNewPlaceForm
