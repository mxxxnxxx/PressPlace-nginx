import { Button, IconButton, makeStyles, Typography } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import InfoIcon from '@material-ui/icons/Info'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Link } from "react-scroll"
import Heading from '../../../../../public/background_image/Heading.jpg'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'


const useStyle = makeStyles((theme) => ({
    heading: {
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: `url(${Heading})`,

    },
    textBox: {
        position: 'absolute',
        top: '35%',
        left: '50%',
        width: '100%',
        '-webkit-transform': 'translate(-50%, -50%)',
        '-moz-transform': ' translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        'z-index': 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: '35%',
            left: '50%',
            width: '100%',
            '-webkit-transform': 'translate(-50%, -50%)',
            '-moz-transform': ' translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)',
            'z-index': 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
    pressButton: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        '-webkit-transform': 'translate(-50%, -50%)',
        '-moz-transform': ' translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: '60%',
            left: '33%',
            '-webkit-transform': 'translate(-50%, -50%)',
            '-moz-transform': ' translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)',
            'z-index': 100,
        }
    },
    searchButton: {
        position: 'absolute',
        top: '70%',
        left: '50%',
        '-webkit-transform': 'translate(-50%, -50%)',
        '-moz-transform': ' translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: '60%',
            left: '66%',
            '-webkit-transform': 'translate(-50%, -50%)',
            '-moz-transform': ' translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)',
            'z-index': 100,
        }
    },
    adventureButton: {
        position: 'absolute',
        top: '80%',
        left: '50%',
        '-webkit-transform': 'translate(-50%, -50%)',
        '-moz-transform': ' translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: '80%',
            left: '50%',
            '-webkit-transform': 'translate(-50%, -50%)',
            '-moz-transform': ' translate(-50%, -50%)',
            transform: 'translate(-50%, -50%)',
            'z-index': 100,
        }
    },
    // アニメーションの記述
    '@keyframes flash': {
        '0%, 100%': {
            opacity: 1
        },

        '50%': {
            opacity: 0
        }
    },
    downward: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        marginTop: theme.spacing(2),
        animation: `$flash 1s linear infinite`,
    }
}))
const AppImageCover: React.FC = () => {
    const history = useHistory()
    const classes = useStyle()

    return (
        <div className={classes.heading}>
            <div className={classes.textBox}>
                <Typography align='center' variant="h2" color="initial">
                    PressPlace
                </Typography>
                <Typography align='center' variant="h6" color="initial">
                    場所でつながるSNS
                </Typography>
                <IconButton onClick={() => history.push('/about')}>
                    <InfoIcon />
                </IconButton>
            </div>
            <div className={classes.pressButton}>
                <Button
                    variant='contained'
                    onClick={() => history.push('/press')}
                    startIcon={<CreateIcon />}
                    size='large'
                >場所を投稿</Button>
            </div>
            <div className={classes.searchButton}>
                <Button
                    variant='contained'
                    onClick={() => history.push('/places/search')}
                    startIcon={<SearchIcon />}
                    size='large'
                >場所を探す</Button>
            </div>
            <div className={classes.adventureButton}>
                <div className={classes.downward}>
                    <div>
                        <Typography variant="h6" color="initial">
                            冒険する
                        </Typography>
                    </div>
                    <div>
                        <Link
                            activeClass="active"
                            to="place-cards"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                        >
                            <ArrowDownwardIcon className={classes.arrow} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AppImageCover
