import { Routes, Route } from 'react-router-dom';

import PageError from 'components/PageError';
import Layout from 'layouts/main';
import AccountPage from 'pages/Account';
import BudgetsPage from 'pages/Budgets';
import AddBudgetPage from 'pages/Budgets/AddBudget';
import EditBudgetPage from 'pages/Budgets/EditBudget';
import CategoriesPage from 'pages/Categories';
import DashboardPage from 'pages/Dashboard';
import ReportPage from 'pages/Report';
import SettingsPage from 'pages/Settings';
import TransactionsPage from 'pages/Transactions';
import AddTransactionPage from 'pages/Transactions/AddTransaction';
import EditTransactionPage from 'pages/Transactions/EditTransaction';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="budgets" element={<BudgetsPage />} />
        <Route path="budgets/add" element={<AddBudgetPage />} />
        <Route path="budgets/:id/edit" element={<EditBudgetPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="transactions/add" element={<AddTransactionPage />} />
        <Route path="transactions/:id/edit" element={<EditTransactionPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Route>
      <Route
        path="*"
        element={<PageError message="Sorry we were'nt able to display what you're looking for." />}
      />
    </Routes>
  );
};

export default PrivateRoutes;
