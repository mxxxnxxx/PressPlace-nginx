import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Img from '../../../../../public/background_image/adventure.png'
import HelpGridContainer from '../../components/organisms/HelpGridContainer'

const GoHelpGridContainer: React.FC = () => {
    const history = useHistory()
    const helpParagraph = {
        title: 'さあ冒険へ!!',
        subTitle: '仲間を見つけに行こう',
        helpText: 'さあ自分の直感を信じて冒険だ｡\nみんなの場所に行ってみよう',
        linkButton:
            <Button
                variant='contained'
                onClick={() => history.push('/')}
            >
                Go
            </Button>
    }
    return (
        <HelpGridContainer
            direction='row'
            Img={Img}
            helpParagraph={helpParagraph}
        />
    )
}
export default GoHelpGridContainer
