import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import listReducer from './reducers/listReducer';
import regionsReducer from './reducers/regionsReducer';

const listApp = document.getElementById('list_app');

const initialState = {
  list: JSON.parse(listApp.dataset.list),
  regions: JSON.parse(listApp.dataset.regions)
};

const reducers = combineReducers({
  list: listReducer,
  regions: regionsReducer
});

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/lists/:list" component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  listApp
);
