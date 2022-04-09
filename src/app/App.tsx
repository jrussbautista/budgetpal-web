import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect } from 'react';

import { fetchCurrentUser, removeCurrentUser } from 'features/auth/authSlice';
import { fetchCategories } from 'features/categories/categoriesSlice';
import AppRoutes from 'routes/AppRoutes';

import { useAppDispatch, useAppSelector } from './hooks';

function App() {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getCurrentUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }
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

  return <AppRoutes />;
}

export default App;
