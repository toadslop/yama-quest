import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import listReducer from './reducers/listReducer';
import regionsListReducer from './reducers/regionsListReducer';

const listApp = document.getElementById('list_app');
const lang = JSON.parse(listApp.dataset.language)
I18n.locale = lang

const initialState = {
  list: JSON.parse(listApp.dataset.list),
  regionsList: JSON.parse(listApp.dataset.regions_list)
};

const reducers = combineReducers({
  list: listReducer,
  regionsList: regionsListReducer
});

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

const langBase = (lang === 'en' ? '' : `/${lang}` )

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={`${langBase}/lists/:list`} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  listApp
);
