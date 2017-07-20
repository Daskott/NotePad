import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import NoteReducer from './reducers/note'
import Application from './containers/app';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap';
import './app.css';

const store = createStore(
  NoteReducer,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('container')
);
