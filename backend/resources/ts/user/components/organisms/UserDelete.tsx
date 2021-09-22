
import { Backdrop, Box, Button, CircularProgress, makeStyles, Paper, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { AxiosError } from "axios"
import React, { FC, useCallback, useState } from "react"
import UserDeleteAlert from "../molecules/UserDeleteAlert"
import UserDeleteDialog from "../molecules/UserDeleteDialog"

type Props = {
    statusCode?: number
    isLoading: boolean
    handleDeleteUser: VoidFunction
    error: AxiosError<any> | null
}
const UserDelete: React.FC<Props> = ({
    handleDeleteUser,
    statusCode,
    isLoading,
    error
}) => {

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.up('sm'))
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
        <Box
            pt={paddingY * 2}
            pb={paddingY}
            display="flex"
            flexDirection="column"
            alignItems="center"
        >

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
            <UserDeleteDialog
                dialogId={dialogId}
                open={isDeleteDialogOpen}
                handleDeleteDialogClose={handleDeleteDialogClose}
                handleDeleteUser={handleDeleteUser}
            />
            <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}
export default UserDelete
