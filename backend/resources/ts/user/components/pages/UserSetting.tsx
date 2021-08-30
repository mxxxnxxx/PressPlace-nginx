import { Backdrop, Box, Button, CircularProgress, Grid, makeStyles, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { AxiosError } from "axios"
import React, { FC, useCallback, useState } from "react"
import Footer from "../../../layout/components/organisms/Footer"
import Header from "../../../layout/containers/organisms/Header"
import UserDeleteAlert from "../molecules/UserDeleteAlert"
import UserDeleteDialog from "../molecules/UserDeleteDialog"

type Props = {
    statusCode?: number
    isLoading: boolean
    handleDeleteUser: VoidFunction
    error: AxiosError<any> | null
}
const useStyles = makeStyles(() => ({
    decorationLine: {
        borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
        borderImageSlice: 1,
    },
}))
const UserSetting: FC<Props> = ({
    handleDeleteUser,
    statusCode,
    isLoading,
    error
}) => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))
    const classes = useStyles()
    const paddingY = 2
    const dialogId = 'delete-user-confirm'

    // componentsには基本的にロジックを持たせないが、UIの状態に関するものなので、ここで定義している
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
    const handleDeleteDialogOpen = useCallback(() => {
        setIsDeleteDialogOpen(true)
    }, [])
    const handleDeleteDialogClose = useCallback(() => {
        setIsDeleteDialogOpen(false)
    }, [])
    return (
        <>
            <main style={{ flex: 9 }}>
                <Box alignItems="center" >
                    <Paper component="section" style={{
                        padding: matches ? `${theme.spacing(2)}px ${theme.spacing(6)}px` : `${theme.spacing(2)}px ${theme.spacing(3)}px`
                    }}>
                        <Box py={paddingY} borderBottom={2} className={classes.decorationLine}>
                            <Typography align="center" component="h2" variant="h4">
                                アカウント設定
                            </Typography>
                        </Box>
                        <Box pt={paddingY * 2} pb={paddingY}>
                            <Typography component="h3" variant="h5" color="secondary" paragraph>
                                アカウント削除
                            </Typography>
                            <Typography paragraph>
                                削除すると元に戻すことは出来ません。
                            </Typography>
                            {statusCode && <Box mb={2}>
                                <UserDeleteAlert statusCode={statusCode} error={error} />
                            </Box>}
                            <Button
                                color="secondary"
                                variant="outlined"
                                aria-label="ログインユーザを削除"
                                aria-controls={dialogId}
                                aria-haspopup="dialog"
                                onClick={handleDeleteDialogOpen}
                            >
                                アカウント削除
                            </Button>
                        </Box>
                    </Paper>
                </Box>
                <UserDeleteDialog
                    dialogId={dialogId}
                    open={isDeleteDialogOpen}
                    handleDeleteDialogClose={handleDeleteDialogClose}
                    handleDeleteUser={handleDeleteUser}
                />
                <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        </>

    )
}

export default UserSetting
