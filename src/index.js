import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import dva from 'dva';

const app = dva();
app.router(require('./router').default);
app.start("#root");

export default app._storre;
