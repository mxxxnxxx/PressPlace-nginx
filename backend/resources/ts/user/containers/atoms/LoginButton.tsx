import { Button } from "@material-ui/core"
import React from "react"
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { Link } from "react-router-dom"

const LoginButton: React.FC = () => {
    return (
        <Button
            startIcon={<VpnKeyIcon />}
            component={Link}
            to="/login"
        >

            ログイン
        </Button>
    )
}

export default LoginButton
