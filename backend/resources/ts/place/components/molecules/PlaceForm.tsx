import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext, useController } from "react-hook-form";
import Header from '../../../layout/containers/organisms/Header';
import Footer from '../../../layout/components/organisms/Footer';
import PhotosUpload from "./ImageUp";
import PostalCode from "./PostalCode";
import NewModal from "../organisms/NewModal";

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
import CloseIcon from '@material-ui/icons/Close';


// hooks Formの処理 管理しやすするためこのファイルににまとめます
//stateの定義のみEnhancedで定義

// 型定義
type Inputs = {
  name: string
  comment: string
  address: string
  tags: string
  photos?: File[]
};

type Props = {
  photos: File[]
  setPhotos: (files: File[]) => void
  userName?: string
  onSubmit: (data: Inputs) => Promise<void>
  // statusCode?: number
};

const PlaceForm: React.FC<Props> = ({ userName,
  photos,
  setPhotos,
  onSubmit,
}) => {
  const methods = useForm<Inputs>({ mode: "onBlur", });
  const {
    register,
    errors,
    handleSubmit,
    reset,
    formState
  } = methods
  // // モーダルの表示非表示
  // const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (

    <Box display='flex' flexDirection="column" minHeight="100vh" >
      <Header />
      <main style={{ flex: 1 }}>
        <Container maxWidth="xs" >
          <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
            <CardHeader title="Let's Press." style={{ textAlign: 'center' }} />
            <CardContent>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    p={2}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    {/* {statusCode && <RegisterAlert statusCode={statusCode} error={error}/>} */}
                    <TextField
                      inputRef={register({
                        required: "必須項目です",
                        maxLength: { value: 30, message: '30文字以内で入力してください' },
                      })}
                      label="場所の名前"
                      variant="outlined"
                      name="name"
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.name)}
                      helperText={errors.name && errors.name.message}
                    />

                    <PhotosUpload name="photos" photos={photos} setPhotos={setPhotos} />

                    <PostalCode name="address" />

                    <TextField
                      inputRef={register({
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
                      error={Boolean(errors.comment)}
                      helperText={errors.comment && errors.comment.message}
                    />

                    <TextField
                      inputRef={register({
                        required: "必須項目です",
                        maxLength: { value: 30, message: '30文字以内で入力してください' },
                      })}
                      label="タグ"
                      variant="outlined"
                      name="tags"
                      margin="normal"
                      fullWidth
                      error={Boolean(errors.tags)}
                      helperText={errors.tags && errors.tags.message}
                    />
                    <Button variant={'contained'} type="submit" disabled={!formState.isDirty || formState.isSubmitting}>登録</Button>
                    <Button type="button" disabled={!formState.isDirty || formState.isSubmitting} onClick={() => reset()}>クリア</Button>
                  </Box>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
      {/* <NewModal open={open} modalOff={(): void => setOpen(false)} /> */}
    </Box>
  );
};
export default PlaceForm;