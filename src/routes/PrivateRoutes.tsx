import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '@/app/Layout';
import PageError from '@/components/PageError';
import AccountPage from '@/features/account/pages/Account';
import BudgetsPage from '@/features/budgets/pages/Budgets';
import CategoriesPage from '@/features/categories/pages/Categories';
import DashboardPage from '@/features/dashboard/pages/Dashboard';
import ReportPage from '@/features/report/pages/Report';
import SettingsPage from '@/features/settings/pages/Settings';
import TransactionsPage from '@/features/transactions/pages/Transactions';

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
