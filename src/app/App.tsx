import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { fetchCurrentUser, removeCurrentUser } from '../features/auth/auth-slice';
import ForgotPasswordPage from '../features/auth/pages/ForgotPassword';
import LoginPage from '../features/auth/pages/Login';
import RegisterPage from '../features/auth/pages/Register';
import ResetPasswordPage from '../features/auth/pages/ResetPassword';
import { fetchCategories } from '../features/categories/categories-slice';
import LandingPage from '../features/landing/pages/Landing';
import PageError from '../shared/components/PageError';
import PageLoader from '../shared/components/PageLoader';

import { useAppDispatch, useAppSelector } from './hooks';
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';

const AccountPage = lazy(() => import('../features/account/pages/Account'));
const SettingsPage = lazy(() => import('../features/settings/pages/Settings'));
const ReportPage = lazy(() => import('../features/report/pages/Report'));
const TransactionsPage = lazy(() => import('../features/transactions/pages/Transactions'));
const BudgetsPage = lazy(() => import('../features/budgets/pages/Budget'));
const DashboardPage = lazy(() => import('../features/dashboard/pages/Dashboard'));
const CategoriesPage = lazy(() => import('../features/categories/pages/Categories'));

function App() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

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

  useEffect(() => {
    if (user) {
      dispatch(fetchCategories());
    }
  }, [user, dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/signin" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <Route
          exact
          path={[
            '/dashboard',
            '/budgets',
            '/transactions',
            '/settings',
            '/account',
            '/report',
            '/categories',
          ]}
        >
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Switch>
                <PrivateRoute path="/dashboard" component={DashboardPage} exact />
                <PrivateRoute path="/budgets" component={BudgetsPage} exact />
                <PrivateRoute path="/transactions" component={TransactionsPage} exact />
                <PrivateRoute path="/account" component={AccountPage} exact />
                <PrivateRoute path="/report" component={ReportPage} exact />
                <PrivateRoute path="/settings" component={SettingsPage} exact />
                <PrivateRoute path="/categories" component={CategoriesPage} exact />
              </Switch>
            </Suspense>
          </Layout>
        </Route>
        <Route path="*">
          <PageError message="Sorry we were'nt able to display what you're looking for." />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
