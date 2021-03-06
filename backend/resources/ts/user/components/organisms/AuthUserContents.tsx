import { AppBar, Box, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Categories from '../../../place/containers/organisms/CategoriesBoard'
import FavoritePlaces from '../../../place/containers/organisms/FavoritePlaces'

type Props = {
    userName?: string
    value: string
    handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void
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
        width: '90%',
        marginTop: theme.spacing(3),
        marginLeft: 'auto',
        marginRight: 'auto'
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
    },
}))
const AuthUserContents: React.FC<Props> = ({
    userName,
    value,
    handleChange,
}) => {
    const classes = useStyles()

    return (
        <Box className={classes.root}>
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
                        <Tab value="myPlace" label="??????" {...a11yProps('myPlace')} />
                        <Tab value="favoritePlace" label="???????????????" {...a11yProps('favoritePlace')} />
                    </Tabs>
                </AppBar>
            </Box>
            <TabPanel value={value} index="myPlace">
                <Categories />
            </TabPanel>

            <TabPanel value={value} index="favoritePlace">
                <FavoritePlaces
                    userName={userName}
                />
            </TabPanel>

        </Box>
    )
}

export default AuthUserContents
