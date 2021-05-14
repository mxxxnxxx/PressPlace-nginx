import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import PlaceForm from "./place/new/PlaceForm";
import Router from './Router';


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
                retry:false
            },
            mutations: {
                retry: false
            }
        }
    })
    return (
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    );
}

if (document.getElementById("react")) {
    ReactDOM.render(<App />, document.getElementById("react"));
}

export default App;