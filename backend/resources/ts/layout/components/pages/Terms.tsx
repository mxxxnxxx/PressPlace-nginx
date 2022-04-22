import { makeStyles, Paper, Typography } from '@material-ui/core'
import Map from '../../../../../public/background_image/map.png'
import React from 'react'

type Props = {
    aboutTerm: string
    termsArray: { title: string, contents: string[] }[]
}
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
    },
    container: {
        width: '95%',
        maxWidth: '40rem',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(5)
    },
    aboutTerm: {
        marginTop: theme.spacing(2)
    },
    term: {
        marginTop: theme.spacing(2)
    },
    termContents: {
        marginTop: theme.spacing(1)
    }
}))
const Terms: React.FC<Props> = ({ aboutTerm, termsArray }) => {
    const classes = useStyle()
    return (
        <section className={classes.root}>
            <Paper className={classes.container}>
                <Typography variant='h3' align='center'>
                    利用規約
                </Typography>
                <Typography className={classes.aboutTerm}>{aboutTerm}</Typography>
                {termsArray.map((term, index) => (
                    <div key={index.toString()} className={classes.term}>
                        <Typography variant='h5'>{term.title}</Typography>
                        {
                            term.contents.length === 1 ?
                                term.contents.map((content, index) => (
                                    <div key={index.toString()} className={classes.termContents}>
                                        <Typography>{`･${content}`}</Typography>
                                    </div>
                                ))
                                :
                                term.contents.map((content, index) => (
                                    <div key={index.toString()} className={classes.termContents}>
                                        <Typography>{`${index + 1}. ${content}`}</Typography>
                                    </div>
                                ))
                        }
                    </div>
                ))}
            </Paper>

        </section>
    )
}
export default Terms
