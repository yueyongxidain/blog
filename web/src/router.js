import React from 'react';
import { Route, Switch, routerRedux } from "dva/router";
import Homepage from "./routes/home/index.js";
import Admin_ from "./routes/admin_/index.js";
const { ConnectedRouter } = routerRedux;
function Routerconfig({ history, app }) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/e/admin" component={Admin_} />
                <Route path="/" component={Homepage} />
            </Switch>
        </ConnectedRouter>
    )
}
export default Routerconfig