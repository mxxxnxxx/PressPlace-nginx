import React, { useState, useEffect } from 'react'
import camelcaseKeys from 'camelcase-keys'
import { useForm, FormProvider } from 'react-hook-form'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import EditPlaceForm from '../../components/organisms/EditPlaceForm'
import { useCurrentUser } from '../../../user/hooks'
import imageCompression from "browser-image-compression"
import useEditPostPlaceQuery from '../../hooks/useEditPostPlaceMutation'
import { Place } from '../../types/Place'
import { PlaceImage } from '../../types/PlaceImage'
import axios from 'axios'
import Loding from '../../../layout/components/pages/Loding'

type Inputs = {
    name: string
    comment: string
    address: string
    tag: string
    photos?: File[]
}


const EnhancedEditPlaceForm: React.FC = () => {
    // ログインできてるか確認
    const user = useCurrentUser()
    const methods = useForm<Inputs>({ shouldUnregister: false, })
    const { setValue } = methods
    const history = useHistory()
    const location = useLocation()
    const { from } = (location.state as { from: string }) || {
        from: { pathname: '/' },
    }
    // 投稿画像のstateを設定
    const [photos, setPhotos] = useState<File[]>([])
    const [oldPhotos, setOldPhotos] = useState<PlaceImage[]>([])
    // 前のplaceの値を取得
    const params = useParams<{ placeId: string }>()
    const [targetPlaceId, setTargetPlaceId] = useState<string>()
    const [oldPlace, setOldPlace] = useState<Place>()
    const photoCount = photos.length + oldPhotos.length
    const [loadOldPlace, setLoadOldPlace] = useState<boolean>(true)

    const set = (camelOldPlace: Place) => {
        const { id, name, address, comment, tags, placeImages } = camelOldPlace
        setTargetPlaceId(id)
        setValue('name', name)
        setValue('address', address)
        setValue('comment', comment)
        setOldPhotos(() => placeImages)
        for (let i = 0; i < tags.length; i++) {
            setValue(`tag.${i}`, tags[i].name)
        }
        setOldPlace(camelOldPlace)
    }

    useEffect(
        () => {
            // コールバックのasync,
            (async (): Promise<void> => {
                const { data } = await axios.get(`/api/places/${params.placeId}`)
                const camelOldPlace: Place = await camelcaseKeys(data, { 'deep': true })
                set(camelOldPlace)
                setLoadOldPlace(false)
            })()
            window.scrollTo(0, 0)
        }, [])



    // Formからpostの処理
    const { error, isLoading, mutate: editPostPlace } = useEditPostPlaceQuery()
    const statusCode = error?.response?.status

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
        // 以下を追加しないとlaravel側の仕様でエラー
        formData.append("_method", 'PATCH')
        // appendでformDataにキーと値を追加
        targetPlaceId && formData.append("id", targetPlaceId)
        formData.append("name", name)
        formData.append("comment", comment)
        formData.append("address", address)
        formData.append("tags", tag)
        let count = oldPhotos.length
        for (let i = 0; i < count; i++) {
            formData.append("old_place_images[]", oldPhotos[i].imagePath)
        }

        const compressOptions = {
            // 3MB以下に圧縮する
            maxSizeMB: 15,
        }
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


        // 以下 一枚の写真しか送れなかったもの
        // forEachで圧縮した写真データphotoDataとして渡し一つずつformDataに入れる
        // compressedPhotoData.forEach((photoData) => {
        //   formData.append("place_image", photoData.blob, photoData.name)
        // })
        // 以下はlaravel側に直前のデータ

        // axiosを内包したusePostPlaceQueryでpost
        editPostPlace(formData,
            {
                onSuccess: () => {
                    history.replace(from)
                }
            }
        )
    }

    if (loadOldPlace) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <FormProvider {...methods}>
            <EditPlaceForm
                userName={user?.name}
                photos={photos}
                setPhotos={setPhotos}
                oldPlace={oldPlace}
                oldPhotos={oldPhotos}
                setOldPhotos={setOldPhotos}
                onSubmit={onSubmit}
                isLoading={isLoading}
                statusCode={statusCode}
                error={error}
                photoCount={photoCount}

            />
        </FormProvider>
    )
}
export default EnhancedEditPlaceForm
