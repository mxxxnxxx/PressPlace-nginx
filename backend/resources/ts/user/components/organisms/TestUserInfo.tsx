import { Button, Paper, Typography, useTheme } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const TestUserInfo: React.FC = () => {
    const location = useLocation()
    const theme = useTheme()
    return (
        <Paper style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: theme.spacing(2),
            padding: theme.spacing(3)
        }}>
            {location.pathname === '/register' &&
                <Typography variant="h6" color="error" style={{ margin: theme.spacing(2) }}>
                    ･現在テスト版のため新規登録機能は停止中です
                </Typography>
            }
            <Typography style={{ margin: theme.spacing(2) }}>
                以下のアカウントをご利用ください
            </Typography>
            <Typography>メールアドレス</Typography>
            <Typography variant="h6" style={{ marginBottom: theme.spacing(1) }}>
                test@test.mail.com
            </Typography>
            <Typography>パスワード</Typography>
            <Typography variant="h6" style={{ marginBottom: theme.spacing(1) }}>
                testPlay
            </Typography>
            {location.pathname === '/register' &&
                <Button
                    startIcon={<VpnKeyIcon />}
                    component={Link}
                    variant='outlined'
                    to="/login"
                    style={{
                        margin: theme.spacing(2)
                    }}
                >

                    ログイン
                </Button>}

        </Paper>

    )
}
export default TestUserInfo
