import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'
import Masonry from 'react-masonry-css'
import Stone from '/work/backend/public/background_image/stone.jpg'
import Metal from '/work/backend/public/background_image/metal.jpg'
import Portrait from '/work/backend/public/background_image/Portrait.jpg'
import willMore from '/work/backend/public/background_image/willMore.jpg'
import LibraryLogo from '/work/backend/public/logos/LibraryLogo.png'
import willMoreLogo from '/work/backend/public/logos/willMoreLogo.png'

type Props = {
    skillSet: {
        name: string
        logo: any
        skill?: {
            name: string
            logo: any
            skill?: string[]
        }[]
    }[]
}


const Creator: React.FC<Props> = ({ skillSet }) => {
    const useStyle = makeStyles((theme) => ({
        root: {
            flexGrow: 1
        },
        item1: {
            height: '200px',
            backgroundColor: 'rgb(213, 182, 149)',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
        },
        title: {
            padding: '0px',
            color: "rgb(100, 100, 100)"
        },
        item2: {
            height: '200px',
            backgroundImage: `url(${Stone})`,
            backgroundSize: 'cover'
        },
        item3: {
            backgroundColor: 'rgb(247, 228, 210)',
            padding: '10px'
        },
        ProfilePhoto: {
            maxWidth: '1200px',
            width: '100%',

        },
        Profile: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px'
        },
        ProfileData: {
            color: "rgb(100, 100, 100)"
        },
        selfIntroduction: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(216, 216, 216)'
        },
        selfIntroductionTitle: {
            color: "rgb(100, 100, 100)"
        },
        skills: {
            backgroundColor: 'rgb(247, 228, 210)',
        },

        skillSets: {
            padding: theme.spacing(3),
            margin: theme.spacing(5)
        },
        skillSetsTitle: {
            color: "rgb(100, 100, 100)"
        },
        myMasonryGrid: {
            display: 'flex',
            marginLeft: '-30px',
            width: 'auto',
        },
        myMasonryGridColumn: {
            paddingLeft: '30px',
            backgroundClip: 'padding-box'
        },
        skillFrame: {
            boxShadow: 'none',
            marginBottom: theme.spacing(3),

        },
        skill: {
            marginBottom: theme.spacing(2),
            boxShadow: 'none',
            borderStyle: 'inset none none inset',
            borderWidth: '1px'
        },
        Accordion: {
            display: 'flex',
            alignItems: 'center'
        },
        skillName: {
            marginLeft: '16px'
        },
        skillLogo: {
            height: '30px',
            width: '30px',
        },
        skillLibrary: {
            display: 'flex',
            flexDirection: 'column'
        },
        skillLibraryName: {
            fontSize: '12px',
            color: 'Gray',
            paddingLeft: '16px'
        },
        willMore: {
            boxShadow: 'none'
        },
        willMoreImg: {
            width: '100%'
        },
        item7: {
            backgroundColor: 'rgb(237, 206, 139)'
        },
        item8: {
            height: '200px',
            backgroundColor: 'rgb(216, 216, 216)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        sns: {
            color: "rgb(100, 100, 100)"
        },
        item9: {
            height: '200px',
            backgroundImage: `url(${Metal})`,
            backgroundSize: 'cover'
        },
    }))
    const classes = useStyle()

    const breakpointColumnsObj = {
        default: 4,
        1350: 3,
        1048: 2,
        576: 1,
    }

    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                {/* 背景 */}
                <Grid
                    item xs={7}
                    className={classes.item1}
                >
                    <Typography variant='h5' component="div" className={classes.title}>
                        Muneyuki Tachibana
                    </Typography>
                    <Typography className={classes.title} >
                        WEB DEVELOPER
                    </Typography>
                </Grid>

                <Grid
                    item xs={5}
                    className={classes.item2}
                >
                </Grid>

                {/* Profile */}
                <Grid
                    item xs={7}
                    className={classes.item3}
                    style={{
                        padding: '0px'
                    }}
                >
                    <img src={Portrait} className={classes.ProfilePhoto} />
                </Grid>

                <Grid
                    item xs={5}
                    className={classes.Profile}
                    style={{
                        padding: '0px'
                    }}
                >
                    <div className={classes.ProfileData}>
                        <Typography component="div" className={classes.ProfileData}>
                            -PROFILE-
                        </Typography>

                        <Typography component="div" className={classes.ProfileData}>
                            名前:立花 宗之
                        </Typography>

                        <Typography component="div" className={classes.ProfileData}>
                            出身:愛知県 尾張旭（現在は東京都在住）
                        </Typography>

                        <Typography component="div" className={classes.ProfileData}>
                            活動:
                        </Typography>

                        <Typography component="div" className={classes.ProfileData}>
                            趣味:
                        </Typography>
                    </div>
                </Grid>

                {/* 自己紹介 */}
                <Grid
                    item xs={12}
                    className={classes.selfIntroduction}
                >
                    <Typography variant="h6" component="div" className={classes.selfIntroductionTitle}>
                        -About Me-
                    </Typography>
                    <Typography component="div" >

                    </Typography>
                </Grid>

                <Grid
                    item xs={12}
                    className={classes.skills}
                >

                    {/* スキルセット */}
                    {/* Masonryで高さを自動的に合わせてくれる 今後スキルが増えることを考慮 */}
                    <div className={classes.skillSets}>
                        <div className=''>
                            <Typography variant="h6" color="initial" className={classes.skillSetsTitle}>
                                -Skill Sets-
                            </Typography>
                        </div>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className={classes.myMasonryGrid}
                            columnClassName={classes.myMasonryGridColumn}
                        >

                            {skillSet.map((skill, index) => (

                                <Card className={classes.skillFrame} key={index.toString()}>

                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                aria-label={skill.name}
                                                variant="rounded"
                                                src={skill.logo}
                                                className={classes.skillLogo}
                                            />
                                        }
                                        title={skill.name}
                                    />

                                    {skill.skill &&

                                        <CardContent>

                                            {skill.skill.map((skill, index) => (

                                                <div key={index.toString()}>

                                                    {skill.skill ?

                                                        <Accordion
                                                            className={classes.skill}
                                                        >

                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <div className={classes.Accordion}>

                                                                    <Avatar
                                                                        aria-label={skill.name}
                                                                        variant="rounded"
                                                                        src={skill.logo}
                                                                        className={classes.skillLogo}
                                                                    />

                                                                    <Typography
                                                                        className={classes.skillName}
                                                                    >
                                                                        {skill.name}
                                                                    </Typography>

                                                                </div>

                                                            </AccordionSummary>

                                                            {skill.skill &&

                                                                <AccordionDetails>

                                                                    <div className={classes.skillLibrary}>

                                                                        {skill.skill.map((skill, index) => (

                                                                            <p className={classes.skillLibraryName} key={index.toString()}>

                                                                                <img src={LibraryLogo} alt="Library" width='15' />

                                                                                {skill}

                                                                            </p>

                                                                        ))}
                                                                    </div>

                                                                </AccordionDetails>
                                                            }
                                                        </Accordion>
                                                        :
                                                        <Card className={classes.skill}>

                                                            <CardHeader
                                                                avatar={

                                                                    <Avatar
                                                                        aria-label={skill.name}
                                                                        variant="rounded"
                                                                        src={skill.logo}
                                                                        className={classes.skillLogo}
                                                                    />

                                                                }
                                                                title={skill.name}
                                                            />

                                                        </Card>
                                                    }

                                                </div>

                                            ))}
                                        </CardContent>
                                    }
                                </Card>
                            ))}

                            {/* will more */}
                            <Accordion
                                className={classes.willMore}
                            >

                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >

                                    <div className={classes.Accordion}>

                                        <Avatar
                                            aria-label='willMore'
                                            variant="rounded"
                                            src={willMoreLogo}
                                            className={classes.skillLogo}
                                        />

                                        <Typography
                                            className={classes.skillName}
                                        >
                                            will More ...
                                        </Typography>

                                    </div>

                                </AccordionSummary>

                                <AccordionDetails>
                                    <div className={classes.skillLibrary} >
                                        <img src={willMore} alt="willMore" className={classes.willMoreImg} />
                                    </div>
                                </AccordionDetails>

                            </Accordion>

                        </Masonry>

                    </div>

                </Grid>
                {/* 成果物 */}
                <Grid
                    item xs={12}
                    className={classes.item7}
                >

                </Grid>
                {/* SNS */}
                <Grid
                    item xs={7}
                    className={classes.item8}
                >
                    <Typography className={classes.sns}>
                        -SNS-
                    </Typography>
                </Grid>
                <Grid
                    item xs={5}
                    className={classes.item9}
                >
                </Grid>
            </Grid>
        </Box>
    )
}
export default Creator
