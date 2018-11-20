import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import dva from 'dva';
import logger from 'redux-logger';
const app = dva(
    process.env.NODE_ENV === "development" ? {
        onAction: logger,
    } : {}
);
app.model(require("./modal/tools").default);
app.model(require("./modal/demo").default);
app.router(require('./router').default);
app.start("#root");

export default app._storre;
