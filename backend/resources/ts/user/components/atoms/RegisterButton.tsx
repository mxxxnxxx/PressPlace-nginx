import React from "react"
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import { Button } from "@material-ui/core"
import { Link } from 'react-router-dom'

const RegisterButton: React.FC = () => {
    return (
        <Button
            startIcon={<AccessibilityNewIcon />}
            component={Link}
            to="/register"
        >
            新規登録
        </Button>
    )
}
export default RegisterButton
