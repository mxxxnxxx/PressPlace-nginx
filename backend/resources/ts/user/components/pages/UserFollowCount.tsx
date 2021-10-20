import { Box, Tab, Tabs, Typography } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import FollowerList from '../../containers/organisms/FollowerList'
import FollowingList from '../../containers/organisms/FollowingList'

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
                <Box p={3}>
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
const useStyles = makeStyles(() => ({
    root: {
        width: '90%',
        marginTop: '30px',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    userName: {
        marginBottom: '30px',
        textAlign: 'center'
    },
    tabs: {
        width: '70%',
        boxShadow: 'none',
        backgroundColor: 'white',
        marginBottom: '20px',
        padding: '30px',
        borderBottom: 'dashed thin',
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    tab: {
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
            <Typography
                className={classes.userName}
            >
                {userName}
            </Typography>
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
                    <Tab className={classes.tab} value="following" label="フォロー" {...a11yProps('following')} />
                    <Tab value="follower" label="フォロワー" {...a11yProps('follower')} />
                </Tabs>
            </AppBar>

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
    )
}
export default UserFollowCount
