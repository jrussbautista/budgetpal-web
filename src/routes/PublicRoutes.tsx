import { Switch, Route } from 'react-router-dom';

import PageError from '@/components/PageError';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPassword';
import LoginPage from '@/features/auth/pages/Login';
import RegisterPage from '@/features/auth/pages/Register';
import ResetPasswordPage from '@/features/auth/pages/ResetPassword';
import LandingPage from '@/features/landing/pages/Landing';

const PublicRoutes = () => {
  return (
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
      <Route path="*">
        <PageError message="Sorry we were'nt able to display what you're looking for." />
      </Route>
    </Switch>
  );
};

export default PublicRoutes;
