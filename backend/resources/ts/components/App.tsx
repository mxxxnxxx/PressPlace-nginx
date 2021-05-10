import React from "react";
import ReactDOM from "react-dom";
import PlaceForm from "./place/new/PlaceForm";
import Router from './router';

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
    return (
        <Router/>
    );
}

if (document.getElementById("react")) {
    ReactDOM.render(<App />, document.getElementById("react"));
}

export default App;