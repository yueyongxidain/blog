import React from 'react';
import { routerRedux, Route, Switch, Router, Redirect } from "dva/router";
import Homepage from "./home/index.js";
function Routerconfig({ history, app }) {
    return (
        <Router history={history}>
            <Route path="/" component={Homepage} />
        </Router>
    )
}
export default Routerconfig