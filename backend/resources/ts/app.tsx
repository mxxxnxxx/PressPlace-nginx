import React, { FC, useCallback } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useLocation,
    RouteComponentProps
} from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import Place from './place/containers/pages/Place';
import PlaceSearch from './place/containers/molecules/PlaceSearch';
import Login from './user/containers/pages/Login';
import Register from './user/containers/pages/Register';
import Loding from './layout/components/pages/Loding';
import PlaceForm from "./place/containers/molecules/NewPlaceForm";
import PlaceSearched from "./place/containers/organisms/PlaceSearched";
import EditPlaceForm from "./place/containers/molecules/EditPlaceForm";
import MutationErrorAlertBar from './layout/components/molecules/MutationErrorAlertBar';
import { useGetUserQuery, useCurrentUser } from './user/hooks';
import { useMutationErrorQuery } from './layout/hooks/util';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

require('./bootstrap');

declare global {
    interface Window {
        axios: any;
        Popper: any;
        _: any;
        $: any;
        jQuery: any;
    }
}
// UnAuthRouteとAuthRouteのpropsの型
type Props = {
    exact?: boolean;
    path: string;
    children: React.ReactNode;
};

const UnAuthRoute: FC<Props> = ({ exact = false, path, children }) => {
    // useCurrentUserでログインしているか確認しuserに格納
    const user = useCurrentUser();
    return (
        <Route
            exact={exact}
            path={path}
            // ログインしていた場合はルートへしていなかった場合はchildrenを表示
            render={() => (user ? <Redirect to={{ pathname: '/' }} /> : children)}
        />
    );
};

const AuthRoute: FC<Props> = ({ exact = false, path, children }) => {
    const user = useCurrentUser();
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
    );
};

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
        },
        mutations: {
            retry: 1,
        },
    },
});

const App: FC = () => {
    const queryClient = useQueryClient();
    const { isLoading } = useGetUserQuery({
        retry: 0,
        initialData: undefined,
        onError: () => {
            queryClient.setQueryData('user', null);
        },
    });

    const { data: error } = useMutationErrorQuery();

    const handleErrorBarClose = useCallback(
        (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return;
            }

            queryClient.resetQueries('error');
        },
        [queryClient]
    );

    if (isLoading) {
        return <Loding />;
    }

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Place />
                </Route>
                <Route exact path="/places/search">
                    <PlaceSearch />
                </Route>
                <Route exact path="/places/searched">
                    <PlaceSearched />
                </Route>
                <UnAuthRoute exact path="/login">
                    <Login />
                </UnAuthRoute>
                <UnAuthRoute exact path="/register">
                    <Register />
                </UnAuthRoute>

                <AuthRoute exact path="/press">
                    <PlaceForm />
                </AuthRoute>

                <AuthRoute exact path="/place/edit/:placeId">
                    <EditPlaceForm />
                </AuthRoute>
                {/* <AuthRoute exact path="/settings/account">
                <Account />

                以下でエラー時の説明
                <MutationErrorAlertBar
                    error={error}
                    handleErrorBarClose={handleErrorBarClose}
                />
            </AuthRoute> */}
            </Switch>
            <ToastContainer hideProgressBar={true} />
        </>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(
        <Router>
            <QueryClientProvider client={client}>
                <CssBaseline />
                <App />
                {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </QueryClientProvider>
        </Router>,
        document.getElementById('app')
    );
}
