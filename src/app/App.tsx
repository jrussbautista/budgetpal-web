import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './layout';
import PrivateRoute from './PrivateRoute';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';
import {
  fetchCurrentUser,
  removeCurrentUser,
} from '../features/auth/auth-slice';
import LoginPage from '../features/auth/login/Login';
import RegisterPage from '../features/auth/register/Register';
const PageError = lazy(() => import('../shared/components/page-error'));
const AccountPage = lazy(() => import('../features/account/AccountPage'));
const SettingsPage = lazy(() => import('../features/settings/SettingsPage'));
const ReportPage = lazy(() => import('../features/report/ReportPage'));
const TransactionsPage = lazy(
  () => import('../features/transactions/TransactionsPage')
);
const BudgetsPage = lazy(() => import('../features/budgets/BudgetPage'));
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'));

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
          <LoginPage />
        </Route>
        <Route path='/register' exact>
          <RegisterPage />
        </Route>
        <Route
          exact
          path={[
            '/',
            '/budgets',
            '/transactions',
            '/settings',
            '/account',
            '/report',
          ]}
        >
          <Layout>
            <Suspense fallback={<div />}>
              <Switch>
                <PrivateRoute path='/' component={DashboardPage} exact />
                <PrivateRoute path='/budgets' component={BudgetsPage} exact />
                <PrivateRoute
                  path='/transactions'
                  component={TransactionsPage}
                  exact
                />
                <PrivateRoute path='/account' component={AccountPage} exact />
                <PrivateRoute path='/report' component={ReportPage} exact />
                <PrivateRoute path='/settings' component={SettingsPage} exact />
              </Switch>
            </Suspense>
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
