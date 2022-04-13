import { Routes, Route } from 'react-router-dom';

import PageError from 'components/PageError';
import ForgotPasswordPage from 'pages/ForgotPassword';
import LandingPage from 'pages/Landing';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';
import ResetPasswordPage from 'pages/ResetPassword';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="*"
        element={<PageError message="Sorry we were'nt able to display what you're looking for." />}
      />
    </Routes>
  );
};

export default PublicRoutes;
