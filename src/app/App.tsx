import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import Dashboard from '../features/dashboard/Dashboard';
import Budgets from '../features/budgets/Budgets';
import Transactions from '../features/transactions/Transactions';
import Login from '../features/auth/login';
import Register from '../features/auth/register';
import PrivateRoute from './PrivateRoute';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';
import {
  fetchCurrentUser,
  removeCurrentUser,
} from '../features/auth/auth-slice';
import PageError from '../shared/components/page-error';
import Account from '../features/account/Account';
import Settings from '../features/settings/Settings';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await dispatch(fetchCurrentUser());
        unwrapResult(response);
      } catch (error) {
        dispatch(removeCurrentUser());
      }
    };
    getCurrentUser();
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Route
          exact
          path={['/', '/budgets', '/transactions', '/settings', '/account']}
        >
          <Layout>
            <Switch>
              <PrivateRoute path='/' component={Dashboard} exact />
              <PrivateRoute path='/budgets' component={Budgets} exact />
              <PrivateRoute
                path='/transactions'
                component={Transactions}
                exact
              />
              <PrivateRoute path='/account' component={Account} exact />
              <PrivateRoute path='/settings' component={Settings} exact />
            </Switch>
          </Layout>
        </Route>
        <Route path='*'>
          <PageError message="Sorry we were'nt able to display what you're looking for." />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
