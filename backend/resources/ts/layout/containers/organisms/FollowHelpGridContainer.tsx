import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Img from '../../../../../public/background_image/followHelp.jpg'
import HelpGridContainer from '../../components/organisms/HelpGridContainer'

const FollowHelpGridContainer: React.FC = () => {
    const history = useHistory()
    const helpParagraph = {
        title: 'Follow',
        subTitle: 'フォロー機能',
        helpText: '気になるあの人の投稿を見逃すことなくチェック\n仲間を増やそう',
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
            direction='row-reverse'
            Img={Img}
            helpParagraph={helpParagraph}
        />
    )
}
export default FollowHelpGridContainer
