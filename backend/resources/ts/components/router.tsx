import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Index from './place/index/Index';

const Router = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/">
                        <Index />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default Router;