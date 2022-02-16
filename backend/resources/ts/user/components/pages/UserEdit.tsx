import { Box, Button, Card, CardContent, CardHeader, Container, makeStyles, TextField, useFormControl, useTheme } from "@material-ui/core"
import React from 'react'
import { useFormContext } from "react-hook-form"
import Loding from "../../../layout/components/pages/Loding"
import UserImageUp from "../../containers/molecules/UserImageUp"
import { UserEditData } from "../../types/UserEditData"
import Vortex from '/work/backend/public/background_image/vortex.png'

type Props = {
    onSubmit: (data: UserEditData) => Promise<void>
    userImage?: File[]
    setUserImage: (files: File[]) => void
    oldUserImage?: string
    setOldUserImage: (string?: string) => void
    isLoading: boolean
}

const useStyles = makeStyles(() => ({
    root: {
        backgroundImage: `url(${Vortex})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    introduction: {
        maxRows: 4,
        minRows: 4
    },
    container: {
        margin: '20px'
    }
}))

const UserEdit: React.FC<Props> = ({
    onSubmit,
    userImage,
    setUserImage,
    oldUserImage,
    setOldUserImage,
    isLoading
}) => {
    const methods = useFormContext()
    const classes = useStyles()
    const theme = useTheme()
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <Box className={classes.root}>
            <main style={{ flex: 1 }}>
                <Container maxWidth="xs" >
                    <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                        <CardHeader title="プロフィール編集" style={{ textAlign: 'center', marginTop: 30 }} />
                        <CardContent>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>

                                <Box
                                    p={2}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <UserImageUp
                                        name='userImage'
                                        userImage={userImage}
                                        setUserImage={setUserImage}
                                        oldUserImage={oldUserImage}
                                        setOldUserImage={setOldUserImage}
                                    />
                                    {/* {statusCode && <PostPlaceAlert statusCode={statusCode} error={error} />} */}
                                    <TextField
                                        inputRef={methods.register({
                                            maxLength: { value: 30, message: '30文字以内で入力してください' },
                                        })}
                                        label="ユーザー名"
                                        variant="outlined"
                                        id="name"
                                        name="name"
                                        className={classes.container}
                                        fullWidth
                                        error={Boolean(methods.errors.name)}
                                        helperText={methods.errors.name && methods.errors.name.message}
                                    />
                                    <TextField
                                        inputRef={methods.register({
                                            maxLength: { value: 100, message: '100文字以内で入力してください' },
                                        })}
                                        label="自己紹介"
                                        id="introduction"
                                        name="introduction"
                                        className={classes.container}
                                        variant="outlined"
                                        fullWidth
                                        multiline={true}
                                        error={Boolean(methods.errors.address)}
                                        helperText={methods.errors.address && methods.errors.address.message}
                                    />
                                    <Box
                                        className={classes.container}
                                    >
                                        <Button
                                            variant={'contained'}
                                            type="submit"
                                            disabled={!methods.formState.isDirty || methods.formState.isSubmitting}
                                        >
                                            変更する
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </main>
        </Box>
    )
}
export default UserEdit
