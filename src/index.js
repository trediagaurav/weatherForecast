import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store'

ReactDOM.render(
  <HashRouter basename='/weatherForecast'>
      <Provider store={store}>
        <App />
      </Provider>
  </HashRouter>,
  document.getElementById('root')
);

reportWebVitals();
