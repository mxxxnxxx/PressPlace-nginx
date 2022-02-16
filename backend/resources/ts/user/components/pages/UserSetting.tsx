import { Box, Card, CardContent, CardHeader, Container, makeStyles, Paper, Typography, useTheme } from "@material-ui/core"
import React, { FC } from "react"
import UserChangeEmail from "../../containers/organisms/UserChangeEmail"
import UserDelete from "../../containers/organisms/UserDelete"
import Tunnel from '/work/backend/public/background_image/tunnel.png'
type Props = {
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${Tunnel})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    decorationLine: {
        borderImage: 'linear-gradient(0.25turn, transparent, #888, transparent)',
        borderImageSlice: 1,
        marginBottom: theme.spacing(4)
    },
    userChangeEmail: {
        margin: 'auto',
        paddingBottom: theme.spacing(4)
    },
    userDelete: {
        margin: 'auto',
        paddingBottom: theme.spacing(4)
    }
}))
const UserSetting: FC<Props> = ({
}) => {
    const classes = useStyles()
    const theme = useTheme()

    return (

        <Box className={classes.root}>
            <main style={{ flex: 1 }}>
                <Container maxWidth="sm">
                    <Card style={{ margin: `${theme.spacing(6)}px 0` }}>
                        <CardHeader title="User設定" style={{ textAlign: 'center', marginTop: 30 }} />

                        <Box p={2} borderBottom={1} className={classes.decorationLine}>
                        </Box>

                        <CardContent>
                            <Box className={classes.userChangeEmail}>
                                <UserChangeEmail />
                            </Box>
                            <Box className={classes.userDelete}>
                                <UserDelete />
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </main>
        </Box>

    )
}

export default UserSetting
