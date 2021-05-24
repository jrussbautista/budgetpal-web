import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import Theme from './app/theme/Theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import utils from '@date-io/date-fns';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={utils}>
        <Theme>
          <App />
        </Theme>
      </MuiPickersUtilsProvider>
      <Toaster />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
