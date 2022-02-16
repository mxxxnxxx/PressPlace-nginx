import { Accordion, AccordionDetails, AccordionSummary, Box, Button, TextField, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useFormContext } from 'react-hook-form'
type Props = {
    onSubmit: (data: {
        email: string;
    }) => Promise<void>
}
const UserResetPasswordSendForm: React.FC<Props> = ({
    onSubmit
}) => {
    const methods = useFormContext()

    const theme = useTheme()
    return (
        <Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>パスワードをお忘れですか?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Box
                            p={2}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Typography>ご登録のメールアドレスをご入力ください</Typography>
                            <TextField
                                inputRef={methods.register({
                                    required: "必須項目です",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'メールアドレスの形式に合わせてください'
                                    },
                                })}
                                label="ご登録のEmailアドレス"
                                variant="outlined"
                                id="email"
                                name="email"
                                margin="normal"
                                fullWidth
                                error={Boolean(methods.errors.email)}
                                helperText={methods.errors.email && methods.errors.email.message}
                            />
                            <Button variant={'contained'} type="submit" color="primary" style={{ marginTop: theme.spacing(2) }} disabled={!methods.formState.isDirty || methods.formState.isSubmitting}>確認メールを送信</Button>
                        </Box>
                    </form>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}
export default UserResetPasswordSendForm
