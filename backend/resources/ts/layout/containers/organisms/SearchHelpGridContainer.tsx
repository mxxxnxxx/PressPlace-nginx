import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Img from '../../../../../public/background_image/SearchHelp.jpg'
import HelpGridContainer from '../../components/organisms/HelpGridContainer'

const SearchHelpGridContainer: React.FC = () => {
    const history = useHistory()
    const helpParagraph = {
        title: 'Search',
        subTitle: '検索機能',
        helpText: '同じ場所でも人の数だけ違う場所になる\n気になる人の気になる場所に行っていみよう',
        linkButton: <Button
            variant='contained'
            onClick={() => history.push('/places/search')}
        >Search</Button>
    }
    return (
        <HelpGridContainer
            direction='row-reverse'
            Img={Img}
            helpParagraph={helpParagraph}
        />
    )
}
export default SearchHelpGridContainer
