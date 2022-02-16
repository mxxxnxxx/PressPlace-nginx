import { Box, Card, Paper, Tab, Tabs, Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import FollowerList from '../../containers/organisms/FollowerList'
import FollowingList from '../../containers/organisms/FollowingList'
import UserProfile from '../../containers/organisms/UserProfile'
import Vortex from '/work/backend/public/background_image/vortex.png'

type Props = {
    value: string
    userName: string
    handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void
    handleChangeIndex: (index: string) => void
    goToOtherUser: (userName: string) => void
}

type TabPanelProps = {
    children?: React.ReactNode
    dir?: string
    index: any
    value: any
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    )
}
function a11yProps(index: any) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    }
}
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Vortex})`,
        backgroundSize: 'cover'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(3),
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tabs: {
        width: '90%',
        backgroundColor: 'white',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: '30px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    tab: {
        width: '90%',
        marginBottom: theme.spacing(3),
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}))

const UserFollowCount: React.FC<Props> = ({
    value,
    userName,
    handleChange,
    goToOtherUser
}) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <UserProfile userName={userName} />
                <AppBar position="static" color="default" className={classes.tabs}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: '#101010',
                            }
                        }}
                        variant="fullWidth"
                        centered
                    >
                        <Tab value="following" label="フォロー" {...a11yProps('following')} />
                        <Tab value="follower" label="フォロワー" {...a11yProps('follower')} />
                    </Tabs>
                </AppBar>
                <Box className={classes.tab}>
                    <TabPanel value={value} index="following">
                        <FollowingList
                            userName={userName}
                            goToOtherUser={goToOtherUser}
                        />
                    </TabPanel>

                    <TabPanel value={value} index="follower">
                        <FollowerList
                            userName={userName}
                            goToOtherUser={goToOtherUser}
                        />
                    </TabPanel>
                </Box>
            </Box>
        </Box>
    )
}
export default UserFollowCount
