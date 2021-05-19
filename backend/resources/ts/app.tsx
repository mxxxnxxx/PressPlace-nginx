import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './components/user/pages/Login';
import Index from './components/place/pages/index';

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

const App: React.VFC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            },
            mutations: {
                retry: false
            }
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/">
                            <Index />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

if (document.getElementById("react")) {
    ReactDOM.render(<App />, document.getElementById("react"));
}

export default App;