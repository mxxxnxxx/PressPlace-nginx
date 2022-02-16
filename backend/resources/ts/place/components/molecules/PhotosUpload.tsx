import { Box, Button, createStyles, Grid, makeStyles, Typography } from "@material-ui/core"
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import { Alert } from '@material-ui/lab'
import { display } from "@material-ui/system"
import React from 'react'
import { PlaceImage } from '../../types/PlaceImage'


type Props = {
    name: string
    componentRef?: (instance: HTMLInputElement | null) => void
    photos: File[]
    oldPhotos?: PlaceImage[]
    handleCancelOld: (photoIndex: number) => void
    handleCancelNew: (photoIndex: number) => void
    handleFile: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    isSameError: boolean
    isNumberError: boolean
    isFileTypeError: boolean
    photoCount: number
}
// styleのテーマ
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column'
        },
        imageContainer: {
            display: 'grid',
            gap: '5%',
            'grid-template-columns': 'repeat(3, 1fr)',
        },
        image: {
            width: '100%'
        },
        photoIcon: {
            alignSelf: 'center'
        },
        plus: {
            textAlign: 'left'
        },
        input: {
            display: 'none',
        },
        maxImageText: {
            margin: theme.spacing(2)
        }
    }))

// ここからreactのいつものコンポーネント
// 定めたPhotosUploadPropsでかたのしていもおこなっている
const PhotosUpload: React.FC<Props> = ({
    name,
    componentRef,
    photos,
    oldPhotos,
    handleCancelOld,
    handleCancelNew,
    isSameError,
    isNumberError,
    isFileTypeError,
    handleFile,
    photoCount,
}: Props): React.ReactElement => {

    const classes = useStyles()

    return (
        <>
            {/* スプレットで投入される画像を展開 */}
            {/* [...Array(3)]で3つまでのからの配列を作成 */}
            {/* mapメソットでそれぞれの画像に */}
            {/* if文の省略形 なければサンプルが出る */}
            <Box className={classes.imageContainer}>
                {[...Array(3)].map((_: number, index: number) =>
                    oldPhotos && index < oldPhotos.length && (
                        <img
                            className={classes.image}
                            src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${oldPhotos[index].imagePath}`}
                            alt={`あなたの写真 ${index + 1}`}
                            key={index.toString()}
                            onClick={() => handleCancelOld(index)}
                        />
                    )
                )}
                {[...Array(3)].map((_: number, index: number) =>
                    index < photos.length && (
                        <img
                            className={classes.image}
                            key={index.toString()}
                            src={URL.createObjectURL(photos[index])}
                            alt={`あなたの写真 ${index + 1}`}
                            onClick={() => handleCancelNew(index)}
                        />
                    )
                )}
            </Box>


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

            {photoCount < 3 && (
                <label htmlFor={name} style={{ marginTop: 20 }}>
                    <Button
                        variant="outlined"
                        aria-label="upload picture" component="span"
                        startIcon={<CameraAltIcon fontSize="large" />}
                    >
                        写真
                    </Button>
                    <input
                        className={classes.input}
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
            <Box className={classes.maxImageText}>
                <Typography align="right">※最大3枚まで</Typography>
            </Box>
        </>
    )
}
export default PhotosUpload
