import { MuiThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import React, { FC } from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import {
    BrowserRouter as Router, Redirect, Route, Switch
} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { SearchKeyProvider } from './context/SearchKeyContext'
import GlobalStyle from './grobalStyles'
import Footer from './layout/components/organisms/Footer'
import AboutPage from './layout/components/pages/AboutPage'
import Loding from './layout/components/pages/Loding'
import Header from './layout/containers/organisms/Header'
import Policy from './layout/containers/pages/Policy'
import Terms from './layout/containers/pages/Terms'
import NewPlace from './place/components/pages/NewPlace'
import EditPlaceForm from "./place/containers/molecules/EditPlaceForm"
import PlaceSearch from './place/containers/organisms/PlaceSearch'
import PlaceSearched from "./place/containers/organisms/PlaceSearched"
import Place from './place/containers/pages/Place'
import Places from './place/containers/pages/Places'
import AuthUserPage from './user/containers/pages/AuthUserPage'
import Login from './user/containers/pages/Login'
import Register from './user/containers/pages/Register'
import UserChangedEmail from './user/containers/pages/UserChangedEmail'
import UserEdit from './user/containers/pages/UserEdit'
import UserFollowCount from './user/containers/pages/UserFollowCount'
import UserPage from "./user/containers/pages/UserPage"
import UserResetPassword from './user/containers/pages/UserResetPassword'
import UserSetting from "./user/containers/pages/UserSetting"
import useCurrentUser from './user/hooks/useGetCurrentUser'
import useGetUserQuery from './user/hooks/useGetUserQuery'

declare global {
    interface Window {
        axios: any
        Popper: any
        _: any
        $: any
        jQuery: any
    }
}
const useStyle = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingBottom: '0',
        minWidth: '320px'
    }
}))
const theme = createTheme({
    typography: {
        "fontFamily": "\"Zen Kaku Gothic New\", \"sans-serif\"",
        button: {
            textTransform: "none",
        },
    },
    overrides: {
        MuiButton: {
            contained: {
                '&.Mui-disabled': {
                    backgroundColor: 'rgba(250, 250, 250, 1)'
                }
            }
        }
    }
})
// UnAuthRouteとAuthRouteのpropsの型
type Props = {
    exact?: boolean
    path: string
    children: React.ReactNode
}

const UnAuthRoute: FC<Props> = ({ exact = false, path, children }) => {
    // useCurrentUserでログインしているか確認しuserに格納
    const user = useCurrentUser()
    return (
        <Route
            exact={exact}
            path={path}
            // ログインしていた場合はルートへしていなかった場合はchildrenを表示
            render={() => (user ? <Redirect to={{ pathname: '/' }} /> : children)}
        />
    )
}

const AuthRoute: FC<Props> = ({ exact = false, path, children }) => {
    const user = useCurrentUser()
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                // ログインしている場合はchildren
                user ? (
                    children
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: location } }} />
                )
            }
        />
    )
}

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
        },
        mutations: {
            retry: 1,
        },
    },
})

const App: FC = () => {
    const classes = useStyle()
    const { isLoading, refetch: getUserQuery } = useGetUserQuery()

    if (isLoading) {
        return <Loding isLoading={isLoading} />
    }

    return (
        <div className={classes.wrapper} >
            <GlobalStyle />
            <Header />

            <Switch>
                <Route exact path="/">
                    <Places />
                </Route>

                <Route exact path="/about">
                    <AboutPage />
                </Route>

                <Route exact path="/place/:placeId">
                    <Place />
                </Route>

                <Route exact path="/places/search">
                    <PlaceSearch />
                </Route>

                <Route exact path="/places/searched">
                    <PlaceSearched />
                </Route>

                <Route exact path="/terms">
                    <Terms />
                </Route>

                <Route exact path="/policy">
                    <Policy />
                </Route>
                {/* :userName で検索 */}
                {/* :contentsView favoritePlace or myPlace タブの初期ページ */}
                <Route exact path="/account/:userName/:contentsView">
                    <UserPage />
                </Route>

                <Route exact path="/account/count/:userName/:followView">
                    <UserFollowCount />
                </Route>

                <UnAuthRoute exact path="/login">
                    <Login getUserQuery={getUserQuery} />
                </UnAuthRoute>

                <UnAuthRoute exact path="/register">
                    <Register />
                </UnAuthRoute>

                <UnAuthRoute exact path="/user/password/reset/:token">
                    <UserResetPassword />
                </UnAuthRoute>

                <AuthRoute exact path="/press">
                    <NewPlace />
                </AuthRoute>

                <AuthRoute exact path="/mypage/:contentsView">
                    <AuthUserPage />
                </AuthRoute>

                <AuthRoute exact path="/place/edit/:placeId">
                    <EditPlaceForm />
                </AuthRoute>

                <AuthRoute exact path="/user/email/reset/:token">
                    <UserChangedEmail />
                </AuthRoute>

                <AuthRoute exact path="/user/setting">
                    <UserSetting />
                </AuthRoute>

                <AuthRoute exact path="/user/edit">
                    <UserEdit />
                </AuthRoute>

            </Switch>

            <Footer />
            {/* アラート機能 */}
            <ToastContainer hideProgressBar={true} />
        </div>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <Router>
            <QueryClientProvider client={client}>
                <SearchKeyProvider>
                    <CssBaseline />
                    <MuiThemeProvider theme={theme}>
                        <App />
                        {process.env.NODE_ENV === 'development' && (
                            <ReactQueryDevtools initialIsOpen={false} />
                        )}
                    </MuiThemeProvider>
                </SearchKeyProvider>
            </QueryClientProvider>
        </Router>,
        document.getElementById('app')
    )
}
