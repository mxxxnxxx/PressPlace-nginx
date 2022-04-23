import axios from 'axios'
import imageCompression from "browser-image-compression"
import camelcaseKeys from 'camelcase-keys'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import Loding from '../../../layout/components/pages/Loding'
import useCurrentUser from '../../../user/hooks/useGetCurrentUser'
import QuotePlaceForm from '../../components/organisms/QuotePlaceForm'
import usePostPlaceQuery from '../../hooks/usePostPlaceMutation'
import { Place } from '../../types/Place'

type Inputs = {
    name: string
    comment: string
    address: string
    tag: string
    photos?: File[]
}


const EnhancedQuotePlaceForm: React.FC = () => {
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
    const photoCount = photos.length
    // 引用元のplaceの値を取得
    const params = useParams<{ placeId: string }>()
    const [quotePlace, setQuotePlace] = useState<Place>()
    const [loadQuotePlace, setLoadQuotePlace] = useState<boolean>(true)
    // 引用元の情報をvalueにセット
    const set = (camelQuotePlace: Place) => {
        const { id, address, comment, tags } = camelQuotePlace
        setValue('address', address)
        setValue('comment', comment)
        for (let i = 0; i < tags.length; i++) {
            setValue(`tag.${i}`, tags[i].name)
        }
        setQuotePlace(camelQuotePlace)
    }

    useEffect(
        () => {
            // コールバックのasync,
            (async (): Promise<void> => {
                const { data } = await axios.get(`/api/place/${params.placeId}`)
                const camelQuotePlace: Place = await camelcaseKeys(data, { 'deep': true })
                set(camelQuotePlace)
                setLoadQuotePlace(false)
            })()
            window.scrollTo(0, 0)
        }, [])



    // Formからpostの処理
    const { error, isLoading, mutate: postNewPlace } = usePostPlaceQuery()
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
        // appendでformDataにキーと値を追加
        formData.append("name", name)
        formData.append("comment", comment)
        formData.append("address", address)
        formData.append("tags", tag)
        quotePlace && formData.append("quote_place_id", quotePlace.id.toString())


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

        // axiosを内包したusePostPlaceQueryでpost
        postNewPlace(formData,
            {
                onSuccess: () => {
                    history.replace(from)
                }
            }
        )
    }

    if (loadQuotePlace) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <FormProvider {...methods}>
            <QuotePlaceForm
                userName={user?.name}
                photos={photos}
                quotePlace={quotePlace}
                onSubmit={onSubmit}
                isLoading={isLoading}
                statusCode={statusCode}
                error={error}
                photoCount={photoCount}
                setPhotos={setPhotos}
            />
        </FormProvider>
    )
}
export default EnhancedQuotePlaceForm
