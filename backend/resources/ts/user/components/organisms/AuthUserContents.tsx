import { AppBar, Box, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import FavoritePlaces from '../../../place/containers/organisms/FavoritePlaces'
import UserPlaces from '../../../place/containers/organisms/UserPlaces'

type Props = {
    userName?: string
    value: string
    handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void
    handleChangeIndex: (index: string) => void
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
const useStyles = makeStyles((theme) => ({
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
        backgroundColor: 'white',
        padding: theme.spacing(3),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    tab: {
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}))
const UserContents: React.FC<Props> = ({
    userName,
    value,
    handleChange,
}) => {
    const classes = useStyles()

    return (

        <Box className={classes.root}>
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
                    <Tab className={classes.tab} value="myPlace" label="投稿した場所" {...a11yProps('following')} />
                    <Tab className={classes.tab} value="favoritePlace" label="お気に入りの場所" {...a11yProps('follower')} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index="myPlace">
                <UserPlaces
                    userName={userName}
                />
            </TabPanel>

            <TabPanel value={value} index="favoritePlace">
                <FavoritePlaces
                    userName={userName}
                />
            </TabPanel>
        </Box>
    )
}

export default UserContents
