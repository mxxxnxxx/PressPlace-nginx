import { Box, makeStyles, Typography } from "@material-ui/core"
import React, { FC } from "react"
import UserChangeEmail from "../../containers/organisms/UserChangeEmail"
import UserDelete from "../../containers/organisms/UserDelete"

type Props = {
}
const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        margin: '30px',
        borderBottom: 'dashed',
    },
    contents: {
        border: 'dashed'
    }
}))
const UserSetting: FC<Props> = ({
}) => {
    const classes = useStyles()

    // componentsには基本的にロジックを持たせないが、UIの状態に関するものなので、ここで定義している
    return (
        <Box className={classes.root}>
            <Box className={classes.title}>
                <Typography
                    align="center"
                    component="h5"
                    variant="h4"
                >
                    アカウント設定
                </Typography>
            </Box>
            <Box className={classes.contents}>
                <UserChangeEmail />
                <UserDelete />
            </Box>
        </Box>

    )
}

export default UserSetting
