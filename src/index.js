import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {BrowserRouter as Router} from "react-router-dom";
import {combineReducers} from "redux";
import {applyMiddleware} from "redux";
import {register} from "./reducers/UserReducer";
import {login} from "./reducers/UserReducer";
import * as thunk from 'redux-thunk';
import './index.css';
import '././assets/styles/global.scss';
import App from './App';
import canvas from './reducers/canvasReducer';
import {canvases} from "./reducers/canvasReducer";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from "react-notifications";
import { setupInterceptors } from "./plugins/axios";
import { handleTokenUpdate } from "./actions/UserActions";
import { returnToken } from "./utils/helpers";

export const reducers = combineReducers({
    canvas,
    register,
    login,
    canvases
});

export const middleware = applyMiddleware(thunk.default);

const store = createStore(reducers, middleware);
store.dispatch(handleTokenUpdate(returnToken()));
setupInterceptors(store);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
        <NotificationContainer/>
    </Provider>,
  document.getElementById('root')
);

