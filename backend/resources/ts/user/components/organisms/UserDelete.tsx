
import { Accordion, AccordionSummary, Backdrop, Box, Button, CircularProgress, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { AxiosError } from "axios"
import React, { useCallback, useState } from "react"
import UserDeleteAlert from "../molecules/UserDeleteAlert"
import UserDeleteDialog from "../molecules/UserDeleteDialog"

type Props = {
    statusCode?: number
    isLoading: boolean
    handleDeleteUser: VoidFunction
    error: AxiosError<any> | null
}
const useStyle = makeStyles((theme) => ({
    AccordionContents: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    button: {
        alignSelf: 'center'
    }
}))
const UserDelete: React.FC<Props> = ({
    handleDeleteUser,
    statusCode,
    isLoading,
    error
}) => {
    const classes = useStyle()
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
        >
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>アカウントを削除</Typography>
                </AccordionSummary>
                <Box className={classes.AccordionContents}>
                    <Typography paragraph>
                        削除すると元に戻すことは出来ません。
                    </Typography>
                    {statusCode && <Box mb={2}>
                        <UserDeleteAlert statusCode={statusCode} error={error} />
                    </Box>}
                    <Button
                        color="secondary"
                        className={classes.button}
                        variant="outlined"
                        aria-label="ログインユーザを削除"
                        aria-controls={dialogId}
                        aria-haspopup="dialog"
                        onClick={handleDeleteDialogOpen}
                    >
                        アカウント削除
                    </Button>
                </Box>
            </Accordion>
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
