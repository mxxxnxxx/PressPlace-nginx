import {
    Backdrop,
    Box,
    Button, Card, CardContent, CardHeader, CircularProgress,
    Container, makeStyles, TextField, useTheme
} from "@material-ui/core"
import { AxiosError } from 'axios'
import React from 'react'
import { useFormContext } from "react-hook-form"
import PhotosUpload from "../../containers/molecules/PhotosUpload"
import TagsForm from "../../containers/molecules/TagsForm"
import { Place } from '../../types/Place'
import { PlaceImage } from '../../types/PlaceImage'
import PostalCode from "../molecules/PostalCode"
import PostPlaceAlert from '../molecules/PostPlaceAlert'


// 型定義
type Inputs = {
    name: string
    comment: string
    address: string
    tag: string
    photos?: File[]
}

type Props = {
    photos: File[]
    oldPlace?: Place
    setPhotos: (files: File[]) => void
    userName?: string
    onSubmit: (data: Inputs) => Promise<void>
    isLoading: boolean
    error: AxiosError<any> | null
    statusCode?: number
    oldPhotos?: PlaceImage[]
    setOldPhotos?: (photo: PlaceImage[]) => void
    photoCount: number
}

const useStyle = makeStyles((theme) => ({
    cardContent: {
        padding: '20px',
    },
    placeForm: {
        display: 'flex',
        flexDirection: 'column',
    },
    onSubmitButton: {
        textAlign: 'center'
    }

}))
const NewPlaceForm: React.FC<Props> = ({
    photos,
    setPhotos,
    onSubmit,
    isLoading,
    oldPlace,
    error,
    statusCode,
    oldPhotos,
    setOldPhotos,
    photoCount,
}) => {
    const classes = useStyle()
    const methods = useFormContext()

    const theme = useTheme()

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" >
            <Container maxWidth="xs" >
                <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                    <CardHeader title="Let's Press." style={{ textAlign: 'center', marginTop: 30 }} />
                    <CardContent className={classes.cardContent}>
                        <form className={classes.placeForm} onSubmit={methods.handleSubmit(onSubmit)}>
                            {statusCode &&
                                <PostPlaceAlert
                                    statusCode={statusCode}
                                    error={error}
                                />
                            }
                            <PhotosUpload
                                name="photos"
                                photos={photos}
                                setPhotos={setPhotos}
                                oldPhotos={oldPhotos}
                                setOldPhotos={setOldPhotos}
                                photoCount={photoCount}
                            />
                            <TextField
                                inputRef={methods.register({
                                    required: "必須項目です",
                                    maxLength: { value: 30, message: '30文字以内で入力してください' },
                                })}
                                label="場所の名前"
                                variant="outlined"
                                id="name"
                                name="name"
                                margin="normal"
                                fullWidth
                                error={Boolean(methods.errors.name)}
                                helperText={methods.errors.name && methods.errors.name.message}
                            />

                            <PostalCode name="address" />

                            <TextField
                                inputRef={methods.register({
                                    required: "必須項目です",
                                    maxLength: { value: 200, message: '200文字以内で入力してください' },
                                })}
                                label="コメント"
                                variant="outlined"
                                name="comment"
                                margin="normal"
                                multiline
                                rows={4}
                                fullWidth
                                error={Boolean(methods.errors.comment)}
                                helperText={methods.errors.comment && methods.errors.comment.message}
                            />
                            <TagsForm oldPlace={oldPlace} />
                            <Box className={classes.onSubmitButton}>
                                <Button variant={'contained'} type="submit" disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>登録</Button>
                                <Button type="button" disabled={!methods.formState.isDirty || methods.formState.isSubmitting} onClick={() => methods.reset()}>クリア</Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>

            {/* 以下ローディン画面 */}
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}
export default NewPlaceForm
