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
import mapDataReducer from './reducers/mapDataReducer';

const listApp = document.getElementById('list_app');
I18n.locale = JSON.parse(listApp.dataset.language)

const initialState = {
  list: JSON.parse(listApp.dataset.list),
  regionsList: JSON.parse(listApp.dataset.regions_list),
  locale: I18n.locale,
  sidebar: { visible: null },
  mapData: {
    geojson: JSON.parse(listApp.dataset.geojson),
    bounds: JSON.parse(listApp.dataset.map_bounds),
    viewport: null,
    popupInfo: null,
    boundsSet: false
  }
};

const reducers = combineReducers({
  list: listReducer,
  regionsList: regionsListReducer,
  locale: localeReducer,
  sidebar: sidebarReducer,
  mapData: mapDataReducer
});

const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

const langBase = (I18n.locale === 'en' ? '' : `/${I18n.locale}` )

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={`${langBase}/explorer/:list`} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  listApp
);
