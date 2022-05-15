import { AppBar, Fab, makeStyles, Tab, Tabs } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import React, { FC, useState } from 'react'
import Map from '../../../../../public/background_image/map.png'
import AppImageCover from '../../../layout/components/organisms/AppImageCover'
import { User } from '../../../user/types/User'
import FollowUsersPlaces from '../../containers/organisms/FollowUsersPlaces'
import PlaceCards from '../../containers/organisms/PlaceCards'
import { useHistory } from 'react-router-dom'
import MyPageButton from '../atoms/MyPageButton'

type Props = {
    user?: User | null
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
const useStyle = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${Map})`,
        backgroundAttachment: 'fixed',
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
        maxWidth: '31rem',
        backgroundColor: 'white',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: '30px',
    },
    fab: {
        position: 'fixed',
        right: 30,
        bottom: 50
    }

}))
const Places: FC<Props> = ({ user }) => {
    const classes = useStyle()
    // UI関係のためここに記述
    const [value, setValue] = useState('place-cards')
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue)
    }
    const history = useHistory()
    return (
        <Box className={classes.root}>
            <AppImageCover />
            <section id='place-cards'>
                <Box className={classes.container}>
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
                            <Tab value="place-cards" label="最新の投稿" {...a11yProps('place-cards')} />

                            {user &&
                                <Tab value="follow-users-places" label="フォローした人の投稿" {...a11yProps('follow-users-places')} />
                            }
                        </Tabs>
                    </AppBar>
                </Box>

                <TabPanel value={value} index="place-cards">
                    <PlaceCards />
                </TabPanel>

                <TabPanel value={value} index="follow-users-places">
                    <FollowUsersPlaces />
                </TabPanel>

            </section>
            <MyPageButton />
        </Box>
    )
}
export default Places
