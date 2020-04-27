import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import listReducer from './reducers/listReducer';
import mountainsReducer from './reducers/mountainsReducer';
import mountainReducer from './reducers/mountainReducer';

const listApp = document.getElementById('list_app');

const initialState = {
  list: JSON.parse(listApp.dataset.list),
  mountains: JSON.parse(listApp.dataset.mountains), // TODO: get that from Rails DB.
  mountain: JSON.parse(listApp.dataset.mountain)
};

const reducers = combineReducers({
  list: listReducer,
  mountains: mountainsReducer,
  mountain: mountainReducer
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
