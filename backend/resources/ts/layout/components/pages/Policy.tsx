import { makeStyles, Paper, Typography } from '@material-ui/core'
import { typography } from '@material-ui/system'
import React from 'react'
import Map from '../../../../../public/background_image/map.png'

type policy = {
    title: string
    contents: string[]
}
type Props = {
    aboutPolicy: string
    policyArray: policy[]
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
    aboutPolicy: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(2)
    },
    policyContents: {
        whiteSpace: 'pre-wrap',
        marginTop: theme.spacing(1)
    }
}))
const Policy: React.FC<Props> = ({
    aboutPolicy,
    policyArray
}) => {
    const classes = useStyle()
    return (
        <section className={classes.root}>
            <Paper className={classes.container}>
                <Typography variant='h3' align='center'>
                    プライバシーポリシー
                </Typography>
                <Typography className={classes.aboutPolicy}>{aboutPolicy}</Typography>
                {policyArray.map((policy, i) => (
                    <div key={i.toString()} className={classes.policy}>
                        <Typography variant='h5'>{policy.title}</Typography>
                        {policy.contents.map((content, i) => (
                            <div key={i.toString()} className={classes.policyContents}>
                                <Typography >{`･${content}`}</Typography>
                            </div>
                        ))}
                    </div>
                ))}
            </Paper >

        </section >
    )
}
export default Policy
