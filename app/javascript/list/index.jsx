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
import localeReducer from './reducers/localeReducer';
import sidebarReducer from './reducers/sidebarReducer';

const listApp = document.getElementById('list_app');
I18n.locale = JSON.parse(listApp.dataset.language)

const initialState = {
  list: JSON.parse(listApp.dataset.list),
  regionsList: JSON.parse(listApp.dataset.regions_list),
  locale: I18n.locale,
  sidebar: {visible: null}
};

const reducers = combineReducers({
  list: listReducer,
  regionsList: regionsListReducer,
  locale: localeReducer,
  sidebar: sidebarReducer
});

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

const langBase = (I18n.locale === 'en' ? '' : `/${I18n.locale}` )

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
