import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './components/App';
import AppContext from './components/AppContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppContext><App /></AppContext>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
