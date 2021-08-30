import { Button, createStyles, Grid, makeStyles } from "@material-ui/core"
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import { Alert } from '@material-ui/lab'
import React, { useState } from 'react'
import { PlaceImage } from '../../types/PlaceImage'


type Props = {
    name: string
    componentRef?: (instance: HTMLInputElement | null) => void
    // 以下は画像のstate
    photos: File[]
    setPhotos: (files: File[]) => void
    oldPhotos: PlaceImage[]
    setOldPhotos: (photo: PlaceImage[]) => void
}


// ここからreactのいつものコンポーネント
// 定めたPhotosUploadPropsでかたのしていもおこなっている
const ImageUp: React.FC<Props> = ({
    name,
    componentRef,
    photos,
    setPhotos,
    oldPhotos,
    setOldPhotos,
}: Props): React.ReactElement => {
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
        if (confirm("選択した画像を消してよろしいですか？")) {
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

    // styleのテーマ
    const useStyles = makeStyles(() =>
        createStyles({
            "topContainer": {

            },
            "imageContainer": {

            },
            "image": {
                width: 70,
                margin: 2,
            },
            "note": {},
            "label": {},
            "plus": {
                textAlign: 'left'
            },
            "input": {
                display: 'none',
            }
        }))
    const stylePhot = useStyles()

    return (
        <>

            <div className={stylePhot.topContainer}>
                {/* スプレットで投入される画像を展開 */}
                {/* [...Array(3)]で3つまでのからの配列を作成 */}
                {/* mapメソットでそれぞれの画像に */}
                {/* if文の省略形 なければサンプルが出る */}
                <Grid container spacing={1}>
                    {[...Array(3)].map((_: number, index: number) =>
                        index < oldPhotos.length && (

                            <Grid key={index.toString()} item>
                                <button
                                    type="button"
                                    className={stylePhot.imageContainer}
                                    key={index.toString()}
                                    onClick={() => handleCancelOld(index)}
                                >
                                    <img
                                        className={stylePhot.image}
                                        key={index.toString()}
                                        src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${oldPhotos[index].imagePath}`}
                                        alt={`あなたの写真 ${index + 1}`}
                                    />
                                </button>
                            </Grid>
                        )
                    )}
                </Grid>
                <Grid container spacing={1}>
                    {[...Array(3)].map((_: number, index: number) =>
                        index < photos.length && (

                            <Grid key={index.toString()} item>
                                <button
                                    type="button"
                                    className={stylePhot.imageContainer}
                                    key={index.toString()}
                                    onClick={() => handleCancelNew(index)}
                                >
                                    <img
                                        className={stylePhot.image}
                                        key={index.toString()}
                                        src={URL.createObjectURL(photos[index])}
                                        alt={`あなたの写真 ${index + 1}`}
                                    />
                                </button>
                            </Grid>
                        )
                    )}
                </Grid>
            </div>
            {isSameError && (
                <Alert severity="error" className='m-2'>
                    ※既に選択された画像と同じものは表示されません
                </Alert>
            )}
            {isNumberError && (
                <Alert severity="error" className='m-2'>
                    ※3枚を超えて選択された画像は表示されません
                </Alert>
            )}
            {isFileTypeError && (
                <Alert severity="error" className='m-2'>
                    ※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません
                </Alert>
            )}

            {photos.length + oldPhotos.length < 3 && (
                <label className={stylePhot.label} htmlFor={name} style={{ marginTop: 20 }}>
                    <Button
                        variant="outlined"
                        aria-label="upload picture" component="span"
                        className={stylePhot.label}
                        startIcon={<CameraAltIcon fontSize="large" />}
                    >
                        写真
                    </Button>
                    <input
                        className={stylePhot.input}
                        type="file"
                        name={name}
                        id={name}
                        ref={componentRef}
                        accept="image/*"
                        onChange={handleFile}
                        multiple
                    />
                </label>
            )}
            <div>
                <p className={stylePhot.note}>※最大3枚まで</p>
            </div>
        </>
    )
}
export default ImageUp
