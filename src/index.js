import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { CssBaseline } from '@material-ui/core';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(145, 158, 171, 0.24)',
        },
      },
    },
  },
  palette: {
    background: {
      default: '#171c24',
      paper: '#222b36',
    },
    divider: 'rgba(145, 158, 171, 0.24)',
    error: {
      contrastText: '#ffffff',
      main: '#f44336',
    },
    mode: 'dark',
    primary: {
      contrastText: '#023020',
      main: '#9FE2BF',
    },
    secondary: {
      contrastText: '#9FE2BF',
      main: '#088F8F',
    },
    success: {
      contrastText: '#ffffff',
      main: '#4caf50',
    },
    text: {
      primary: '#ffffff',
      secondary: '#919eab',
    },
    warning: {
      contrastText: '#ffffff',
      main: '#ff9800',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </MuiThemeProvider>
  </Provider>,
  document.querySelector('#root')
);
