import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAppSelector } from './hooks';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Route
      render={() => {
        if (user) return <Component />;

        return <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
