import { Box, Button, Card, CardContent, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import React from 'react'
import { Link } from 'react-router-dom'
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

