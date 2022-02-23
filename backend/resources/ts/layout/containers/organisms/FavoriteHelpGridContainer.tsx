import { Button, GridDirection } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Img from '../../../../../public/background_image/FavoriteHelp.jpg'
import HelpGridContainer from '../../components/organisms/HelpGridContainer'

const FavoriteHelpGridContainer: React.FC = () => {
    const history = useHistory()
    const helpParagraph = {
        title: 'Favorite',
        subTitle: 'お気に入り機能',
        helpText: 'あなた目線で場所を紹介することができます｡\n行きつけの場所をみんなに紹介してみよう',
        linkButton: <Button
            variant='contained'
            onClick={() => history.push('/')}
        >Go</Button>
    }
    return (
        <HelpGridContainer
            direction='row'
            Img={Img}
            helpParagraph={helpParagraph}
        />
    )
}
export default FavoriteHelpGridContainer
