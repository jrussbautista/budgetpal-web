import React from 'react';
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAppSelector } from '../hooks';

const Theme: React.FC = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);

  const palletType = user?.theme === 'light' ? 'light' : 'dark';

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#3498db',
      },
      type: palletType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
