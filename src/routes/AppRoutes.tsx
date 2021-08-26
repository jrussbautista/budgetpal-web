import React, { lazy, Suspense } from 'react';

import PublicRoutes from './PublicRoutes';

import { useAppSelector } from '@/app/hooks';
import PageLoader from '@/components/PageLoader';

const PrivateRoutes = lazy(() => import(/* webpackPrefetch: true */ './PrivateRoutes'));

const AppRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Suspense fallback={<PageLoader />}>{user ? <PrivateRoutes /> : <PublicRoutes />}</Suspense>
  );
};

export default AppRoutes;
