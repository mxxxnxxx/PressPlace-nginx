import { Accordion, AccordionSummary, Backdrop, Box, Button, CircularProgress, makeStyles, TextField, useTheme } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { AxiosError } from 'axios'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ChangeEmailType } from '../../types/ChangeEmailType'
import { User } from '../../types/User'

type Props = {
    user: User | null | undefined
    onSubmit: (data: ChangeEmailType) => Promise<void>
    isLoading: boolean
    statusCode?: number
    error: AxiosError<any> | null
}
const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    AccordionContents: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    button: {
        textAlign: 'center'
    }
}))
const UserChangeEmail: React.FC<Props> = ({
    user,
    onSubmit,
    isLoading,
    statusCode,
    error
}) => {
    const methods = useFormContext()
    const theme = useTheme()
    const classes = useStyle()
    return (
        <Box className={classes.root}>
            <Typography align="center" color="error" style={{ marginBottom: 8 }}>･現在テスト版のためアカウント削除は停止中です</Typography>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        メールアドレスの変更
                    </Typography>
                </AccordionSummary>
                <Box className={classes.AccordionContents}>
                    <Typography
                        color="secondary"
                    >
                        現在のメールアドレス
                    </Typography>
                    <Typography
                        variant="h6"
                        color="initial"
                    >
                        {user?.email}
                    </Typography>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <TextField
                            inputRef={methods.register({
                                required: "必須項目です",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'メールアドレスの形式に合わせてください'
                                },
                            })}
                            label="新しいEmailアドレス"
                            variant="outlined"
                            id="address"
                            name="address"
                            margin="normal"
                            fullWidth
                            error={Boolean(methods.errors.address)}
                            helperText={methods.errors.address && methods.errors.address.message}
                        />

                        <Box className={classes.button}>
                            <Button
                                variant={'contained'}
                                type="submit"
                                disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>
                                登録
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Accordion>
            <Backdrop
                style={{ zIndex: theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}
export default UserChangeEmail
