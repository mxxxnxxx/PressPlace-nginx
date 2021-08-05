import { Box, Container, Card, CardHeader, CardContent, TextField, Backdrop, CircularProgress, useTheme, Button } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import Footer from '../../../layout/components/organisms/Footer';
import Header from '../../../layout/containers/organisms/Header';
import TagsForm from '../../containers/molecules/TagsForm';
import { Inputs } from '../../types/Inputs';

type Props = {
    onSubmit: (data: Inputs) => Promise<void>
}
const PlaceSearch: React.FC<Props> = ({
    onSubmit,
}) => {
    const methods = useFormContext();
    const theme = useTheme();
    return (
        <Box display='flex' flexDirection="column" minHeight="100vh" >
            <Header />
            <main style={{ flex: 1 }}>
                <Container maxWidth="xs" >
                    <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                        <CardHeader title="検索" style={{ textAlign: 'center', marginTop: 30 }} />
                        <CardContent>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Box
                                    p={2}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    {/* {statusCode && <PostPlaceAlert statusCode={statusCode} error={error} />} */}
                                    <TextField
                                        inputRef={methods.register({
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
                                    <TextField
                                        inputRef={methods.register({
                                            maxLength: { value: 100, message: '100文字以内で入力してください' },
                                        })}
                                        label="住所"
                                        variant="outlined"
                                        id="address"
                                        name="address"
                                        margin="normal"
                                        fullWidth
                                        error={Boolean(methods.errors.address)}
                                        helperText={methods.errors.address && methods.errors.address.message}
                                    />
                                    <TextField
                                        inputRef={methods.register({
                                            maxLength: { value: 200, message: '200文字以内で入力してください' },
                                        })}
                                        label="コメント"
                                        variant="outlined"
                                        id="comment"
                                        name="comment"
                                        margin="normal"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        error={Boolean(methods.errors.comment)}
                                        helperText={methods.errors.comment && methods.errors.comment.message}
                                    />
                                    <TagsForm />
                                    <Box>
                                        <Button variant={'contained'} type="submit" disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>検索</Button>
                                        <Button type="button" disabled={!methods.formState.isDirty || methods.formState.isSubmitting} onClick={() => methods.reset()}>クリア</Button>
                                    </Box>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </main>
            <Footer />
            {/* <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop> */}
        </Box>
    )
}
export default PlaceSearch;