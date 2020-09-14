import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './App';
import * as serviceWorker from './serviceWorker';
import ScrollTop from "./components/ScrollTop"

import { createBrowserHistory } from "history";

import './css/bootstrap-grid.min.css'
import './css/style.scss'
import './css/animate.min.css'

const appHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={ appHistory }>
        <ScrollTop><App /></ScrollTop>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
