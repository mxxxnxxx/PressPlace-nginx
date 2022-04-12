import { Toolbar, Typography } from '@material-ui/core'
import React from 'react'
const TestMessageHeader: React.FC = () => {
    return (
        <Toolbar>
            <Typography color="error" >
                現在test版のため､利用された方に告知なくデータベースを削除することがあります｡
            </Typography>
        </Toolbar>
    )
}
export default TestMessageHeader
