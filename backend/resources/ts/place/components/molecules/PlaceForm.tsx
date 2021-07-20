import React, { useState, useEffect } from 'react';
import { QueryClient, } from "react-query";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Header from '../../../layout/containers/organisms/Header';
import Footer from '../../../layout/components/organisms/Footer';
import PhotosUpload from "./ImageUp";
import PostalCode from "./PostalCode";
import TagsForm from "../../containers/molecules/TagsForm";
import PostPlaceAlert from './PostPlaceAlert';
import {
  useTheme,
  makeStyles,
  createStyles,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
} from "@material-ui/core"
import { AxiosError } from 'axios';
import { Place } from '../../types/Place'
import { PlaceImage } from '../../types/PlaceImage'

// hooks Formの処理 管理しやすするためこのファイルににまとめます
//stateの定義のみEnhancedで定義

// 型定義
type Inputs = {
  name: string
  comment: string
  address: string
  tag: string
  photos?: File[]
};

type Props = {
  photos: File[]
  oldPlace?: Place
  setPhotos: (files: File[]) => void
  userName?: string
  onSubmit: (data: Inputs) => Promise<void>
  isLoading: boolean
  error: AxiosError<any> | null
  statusCode?: number
  oldPhotos: PlaceImage[]
  setOldPhotos: (photo: PlaceImage[]) => void
};

const PlaceForm: React.FC<Props> = ({
  photos,
  setPhotos,
  onSubmit,
  isLoading,
  oldPlace,
  error,
  statusCode,
  oldPhotos,
  setOldPhotos,
}) => {
  const methods = useFormContext();

  const theme = useTheme();

  return (
    <Box display='flex' flexDirection="column" minHeight="100vh" >
      <Header />
      <main style={{ flex: 1 }}>
        <Container maxWidth="xs" >
          <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
            <CardHeader title="Let's Press." style={{ textAlign: 'center', marginTop: 30 }} />
            <CardContent>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Box
                  p={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  {statusCode && <PostPlaceAlert statusCode={statusCode} error={error} />}
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

                  <PhotosUpload name="photos" photos={photos} setPhotos={setPhotos} oldPhotos={oldPhotos} setOldPhotos={setOldPhotos} />

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
                  <Box>
                    <Button variant={'contained'} type="submit" disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>登録</Button>
                    <Button type="button" disabled={!methods.formState.isDirty || methods.formState.isSubmitting} onClick={() => methods.reset()}>クリア</Button>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
      <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
export default PlaceForm;