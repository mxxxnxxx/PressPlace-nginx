import { Box, Button, createStyles, Grid, makeStyles, Typography } from "@material-ui/core"
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import { Alert } from '@material-ui/lab'
import React from 'react'


type Props = {
    name: string
    componentRef?: (instance: HTMLInputElement | null) => void
    userImage?: File[]
    setUserImage: (files: File[]) => void
    oldUserImage?: string
    setOldUserImage: (string?: string) => void
    isFileTypeError: boolean
    handleFile: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>
    handleCancelNew: () => void
    handleCancelOld: () => void
}


// ここからreactのいつものコンポーネント
// 定めたPhotosUploadPropsでかたのしていもおこなっている
const UserImageUp: React.FC<Props> = ({
    name,
    componentRef,
    userImage,
    setUserImage,
    oldUserImage,
    setOldUserImage,
    isFileTypeError,
    handleFile,
    handleCancelNew,
    handleCancelOld,
}: Props): React.ReactElement => {
    // styleのテーマ
    const useStyles = makeStyles(() =>
        createStyles({
            container: {
                margin: '20px'
            },
            image: {
                width: 70,
                margin: 2,
            },
            plus: {
                textAlign: 'left'
            },
            input: {
                display: 'none',
            },
            imageNon: {
                borderStyle: 'dotted',
                padding: '10px',
                margin: '10px,',
                fontSize: 'small'
            }
        }))
    const classes = useStyles()
    return (
        <>
            <Box>
                {oldUserImage &&
                    <Grid
                        container
                        spacing={1}
                        className={classes.container}
                    >
                        <Grid item>
                            <button
                                type="button"
                                onClick={() => handleCancelOld()}
                            >
                                <img
                                    className={classes.image}
                                    src={`https://pressplace.s3.ap-northeast-1.amazonaws.com/${oldUserImage}`}
                                />
                            </button>
                        </Grid>
                    </Grid>}
                {userImage && userImage.length >= 1 && !(oldUserImage) &&
                    <Grid
                        container
                        spacing={1}
                        className={classes.container}
                    >
                        <Grid item>
                            <button
                                type="button"
                                onClick={() => handleCancelNew()}
                            >

                                <img
                                    className={classes.image}
                                    src={URL.createObjectURL(userImage[0])}
                                />
                            </button>
                        </Grid>
                    </Grid>}

                {userImage && !(userImage.length > 0) && oldUserImage == "" &&
                    <Typography
                        className={classes.imageNon}
                    >
                        プロフィール画像が設定されていません
                    </Typography>}
            </Box>

            {isFileTypeError && (
                <Alert severity="error" className='m-2'>
                    ※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません
                </Alert>
            )}

            {!(userImage && userImage.length > 0) && (
                <label htmlFor={name} style={{ marginTop: 20 }}>
                    <Button
                        variant="outlined"
                        aria-label="upload picture" component="span"
                        startIcon={<CameraAltIcon fontSize="large" />}
                    >
                        プロフィール画像を変更
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
                </label>)}
        </>
    )
}
export default UserImageUp
