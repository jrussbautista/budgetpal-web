import { Switch, Route, Redirect } from 'react-router-dom';

import PageError from 'components/PageError';
import Layout from 'layouts/main';
import AccountPage from 'pages/Account';
import BudgetsPage from 'pages/Budgets';
import CategoriesPage from 'pages/Categories';
import DashboardPage from 'pages/Dashboard';
import ReportPage from 'pages/Report';
import SettingsPage from 'pages/Settings';
import TransactionsPage from 'pages/Transactions';

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path={[
          '/',
          '/dashboard',
          '/budgets',
          '/transactions',
          '/settings',
          '/account',
          '/report',
          '/categories',
        ]}
      >
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
        <Layout>
          <Route path="/dashboard" component={DashboardPage} exact />
          <Route path="/budgets" component={BudgetsPage} exact />
          <Route path="/transactions" component={TransactionsPage} exact />
          <Route path="/account" component={AccountPage} exact />
          <Route path="/report" component={ReportPage} exact />
          <Route path="/settings" component={SettingsPage} exact />
          <Route path="/categories" component={CategoriesPage} exact />
        </Layout>
      </Route>
      <Route path="*">
        <PageError />
      </Route>
    </Switch>
  );
};

export default PrivateRoutes;
