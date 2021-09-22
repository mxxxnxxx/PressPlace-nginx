import { Box, Paper, Typography, Button, Theme, Container, Card, useTheme, CardContent } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Link } from 'react-router-dom'
import Loding from '../../../layout/components/pages/Loding'
type Props = {
    data?: string
    isLoading?: boolean
}
const useStyle = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),

    },
    backButton: {
        textAlign: 'center',
    }
}
))
const UserChangedEmail: React.FC<Props> = ({
    data,
    isLoading
}) => {
    const classes = useStyle()
    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }
    return (
        <Box>
            {/* ユーザー設定に戻れるようにuiを作る */}
            <Container maxWidth="sm" className={classes.container} >
                <Card>
                    <CardContent>
                        <Typography
                            variant="h6"
                            color="initial"
                            align="center"
                        >
                            {data}
                        </Typography>
                        <Box
                            className={classes.backButton}
                        >
                            <Button
                                startIcon={<SettingsIcon />}
                                component={Link}
                                to="/user/setting"
                                variant="contained"
                            >
                                ユーザー設定に戻る
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}
export default UserChangedEmail

