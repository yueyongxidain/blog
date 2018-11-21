import React from 'react';
import { Route, Switch, Router } from "dva/router";
import Homepage from "./routes/home/index.js";
import Admin_ from "./routes/admin_/index.js";
function Routerconfig({ history, app }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/e/admin" component={Admin_} />
                <Route path="/" component={Homepage} />
            </Switch>
        </Router>
    )
}
export default Routerconfig