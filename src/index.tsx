import utils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/App';
import { store } from './app/store';
import Theme from './app/Theme';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MuiPickersUtilsProvider utils={utils}>
          <Theme>
            <App />
          </Theme>
        </MuiPickersUtilsProvider>
        <Toaster />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
