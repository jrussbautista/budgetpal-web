import { Switch, Route } from 'react-router-dom';

import PageError from 'components/PageError';
import ForgotPasswordPage from 'pages/ForgotPassword';
import LandingPage from 'pages/Landing';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';
import ResetPasswordPage from 'pages/ResetPassword';

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
