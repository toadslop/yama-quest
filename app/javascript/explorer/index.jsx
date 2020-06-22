// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Internal imports
import App from './components/app';
import listReducer from './reducers/listReducer';
import regionsListReducer from './reducers/regionsListReducer';
import localeReducer from './reducers/localeReducer';
import sidebarReducer from './reducers/sidebarReducer';
import mapDataReducer from './reducers/mapDataReducer';
import mapViewportReducer from './reducers/mapViewportReducer';

// get the div where we'll render the app
const explorer = document.getElementById('explorer');

// get the current locale passed to the frontend by the rails backend
I18n.locale = JSON.parse(explorer.dataset.language)

// set initial state from data passed in from the rails backend through the DOM
// TODO: replace all of this with calls to the API
const initialState = {
  list: JSON.parse(explorer.dataset.list),
  regionsList: [],
  locale: I18n.locale, // this locale is for making sure components update when the locale updates
  sidebar: { visible: null }, // this is for keeping track with whether the sidebar should be visible or not in mobile
  mapData: {
    geojson: JSON.parse(explorer.dataset.geojson),
    masterData: JSON.parse(explorer.dataset.geojson)
  },
  mapViewport: {
    height: 200,
    width: 200
  }
};

// combining reducers
const reducers = combineReducers({
  list: listReducer,
  regionsList: regionsListReducer,
  locale: localeReducer,
  sidebar: sidebarReducer,
  mapData: mapDataReducer,
  mapViewport: mapViewportReducer
});


const middlewares = applyMiddleware(logger, ReduxPromise);
const store = createStore(reducers, initialState, middlewares);

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