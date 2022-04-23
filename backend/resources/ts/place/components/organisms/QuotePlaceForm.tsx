import {
    Backdrop,
    Box,
    Button, Card, CardContent, CardHeader, CircularProgress,
    Container, makeStyles, TextField, Typography, useTheme
} from "@material-ui/core"
import { AxiosError } from 'axios'
import React from 'react'
import { useFormContext } from "react-hook-form"
import PhotosUpload from "../../containers/molecules/PhotosUpload"
import TagsForm from "../../containers/molecules/TagsForm"
import { Place } from '../../types/Place'
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
    quotePlace?: Place
    userName?: string
    onSubmit: (data: Inputs) => Promise<void>
    isLoading: boolean
    error: AxiosError<any> | null
    statusCode?: number
    photoCount: number
    setPhotos: (files: File[]) => void
}

const useStyle = makeStyles((theme) => ({
    cardContent: {
        padding: '20px'
    },
    placeForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    onSubmitButton: {
        marginTop: theme.spacing(2),
    }
}))
const QuotePlaceForm: React.FC<Props> = ({
    photos,
    onSubmit,
    isLoading,
    quotePlace,
    error,
    statusCode,
    setPhotos,
    photoCount,
}) => {
    const classes = useStyle()
    const methods = useFormContext()
    const theme = useTheme()

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Container maxWidth="xs" >
                <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                    <CardHeader title="引用して投稿する" style={{ textAlign: 'center', marginTop: 30 }} />
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
                                value={quotePlace?.name}
                                fullWidth
                                error={Boolean(methods.errors.name)}
                                helperText={methods.errors.name && methods.errors.name.message}
                            />
                            <Typography style={{
                                fontSize: '1rem',
                                alignSelf: 'flex-start'
                            }} color="error">※引用時は変更できません</Typography>
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
                            <TagsForm place={quotePlace} />
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
export default QuotePlaceForm
