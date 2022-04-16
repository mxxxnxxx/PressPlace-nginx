import React, { useState } from 'react'
import PhotosUpload from "../../components/molecules/PhotosUpload"
import { PlaceImage } from '../../types/PlaceImage'

type Props = {
    name: string
    componentRef?: (instance: HTMLInputElement | null) => void
    // 以下は画像のstate
    photos: File[]
    setPhotos: (files: File[]) => void
    oldPhotos?: PlaceImage[]
    setOldPhotos?: (photo: PlaceImage[]) => void
    photoCount: number
}
const EnhancedPhotosUpload: React.FC<Props> = (
    {
        name,
        componentRef,
        photos,
        setPhotos,
        oldPhotos,
        setOldPhotos,
        photoCount,
    }
) => {
    // hooksのstateを定義
    // エラーをstateで管理
    const [isSameError, setIsSameError] = useState(false)
    const [isNumberError, setIsNumberError] = useState(false)
    const [isFileTypeError, setIsFileTypeError] = useState(false)

    //  エラーを初期化falseに戻す
    const resetErrors = () => {
        setIsSameError(false)
        setIsNumberError(false)
        setIsFileTypeError(false)
    }

    // 以下で非同期の関数を作成している
    // typescriptでイベントを取り扱う時はHTMLInputElementを型に指定
    // photosにファイルを入れる操作
    const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // もしイベントファイルがnullまたはファイル数が0であれば処理を終了
        if (event.target.files === null || event.target.files.length === 0) {
            return
        }
        // Object.valuesで指定したオブジェ（今回は投稿画像）の値をすべて確認
        // concatメソッドで一つの配列に画像のみを詰め込む
        const files = Object.values(event.target.files).concat()

        // 初期化することで同じファイルを連続で選択してもonChangeが発動するように設定し、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応
        event.target.value = ""
        resetErrors()

        // フィルター
        const pickedPhotos = files.filter((file) => {
            // file.typeの型はblobで定義している
            if (
                ![
                    "image/gif",
                    "image/jpg",
                    "image/jpeg",
                    "image/png",
                    "image/bmp",
                    "image/svg+xml",
                ].includes(file.type)
            ) {
                setIsFileTypeError(true)
                return false
            }

            // someメソッドで指定されたコールバック関数がphotos(配列）の任意の要素に対してtrueかどうか確認
            const existsSameSize = photos.some((photo) => photo.size === file.size)
            // ファイルと写真のサイズが本当に一緒か確認
            if (existsSameSize) {
                setIsSameError(true)
                return false
            }

            return true
        })

        // 配列の中身が0ならば処理終了
        if (pickedPhotos.length === 0) {
            return
        }

        // いままでからだったphotosにpickedPhotosを統合し,いれる
        // pickedPhotosは添付された写真じたいがはいっている
        // concatが非破壊的な処理になるのでstateを利用しても大丈夫
        // 破壊的のものを使うと値は変わっても再レンダリングされない
        const concatPhotos = photos.concat(pickedPhotos)
        // ４枚以上でエラー
        if (concatPhotos.length >= 4) {
            setIsNumberError(true)
        }
        // sliceでインデックス０−２までの中身をsetPhotosにいれる
        setPhotos(concatPhotos.slice(0, 3))
    }

    const handleCancelNew = (photoIndex: number) => {
        // windowで確認を取る
        if (confirm("選択した画像を消してよろしいですか？")) {
            // エラーを初期化
            resetErrors()
            // concatでphotosをコピー
            const modifyPhotos = photos.concat()
            // spliceメソッドで中身を削除
            modifyPhotos.splice(photoIndex, 1)
            // その後stateにセット
            setPhotos(modifyPhotos)
        }
    }
    const handleCancelOld = (photoIndex: number) => {
        // windowで確認を取る
        if (confirm("選択した画像を消してよろしいですか？") && oldPhotos && setOldPhotos) {
            // エラーを初期化
            resetErrors()
            // concatでphotosをコピー
            const modifyOldPhotos = oldPhotos.concat()
            // spliceメソッドで中身を削除
            modifyOldPhotos.splice(photoIndex, 1)
            // その後stateにセット
            setOldPhotos(modifyOldPhotos)
        }
    }

    return (
        <PhotosUpload
            name="photos"
            photos={photos}
            oldPhotos={oldPhotos}
            handleCancelOld={handleCancelOld}
            handleCancelNew={handleCancelNew}
            isSameError={isSameError}
            isNumberError={isNumberError}
            isFileTypeError={isFileTypeError}
            handleFile={handleFile}
            photoCount={photoCount}
        />
    )

}
export default EnhancedPhotosUpload
