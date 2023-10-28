import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './configureStore';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';


render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);