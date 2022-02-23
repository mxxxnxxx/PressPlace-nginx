import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Img from '../../../../../public/background_image/PressHelp.jpg'
import HelpGridContainer from '../../components/organisms/HelpGridContainer'

const PressHelpGridContainer: React.FC = () => {
    const history = useHistory()
    const helpParagraph = {
        title: 'Press',
        subTitle: '投稿機能',
        helpText: 'あなた目線で場所を紹介することができます｡\n行きつけの場所をみんなに紹介してみよう',
        linkButton: <Button
            variant='contained'
            onClick={() => history.push('/press')}
        >Press</Button>
    }

    return (
        <HelpGridContainer
            direction='row'
            Img={Img}
            helpParagraph={helpParagraph}
        />
    )
}
export default PressHelpGridContainer
