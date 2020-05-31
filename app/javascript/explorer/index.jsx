// External imports
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

const explorer = document.getElementById('explorer');
I18n.locale = JSON.parse(explorer.dataset.language)

const initialState = {
  list: JSON.parse(explorer.dataset.list),
  regionsList: JSON.parse(explorer.dataset.regions_list),
  locale: I18n.locale,
  sidebar: { visible: null },
  mapData: {
    geojson: JSON.parse(explorer.dataset.geojson),
    bounds: JSON.parse(explorer.dataset.map_bounds),
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

export const getLangBase = () => {
  return (I18n.locale === 'en' ? '/jp' : '')
} 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={`/explorer/:list`} component={App} />
        <Route path={`/:locale/explorer/:list`} component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  explorer
);