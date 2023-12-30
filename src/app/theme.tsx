import {createTheme} from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#76528e',
    },
    secondary: {
      main: '#f50044',
    },
    background: {
      default: 'rgba(0,0,0,0.7)',
      paper: 'rgba(23,23,23,0.7)',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography:{
    fontWeightLight: "200",
    fontWeightRegular: "200"
  }
});
