'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light', // Start with light mode, can be made dynamic later
    primary: {
      main: '#805AD5', // A purple color similar to the search button
    },
    secondary: {
      main: '#ED8936', // An orange color similar to accents in the image
    },
    background: {
        default: '#FFFFFF',
    },
    text: {
      primary: '#1E1B4B',
      secondary: '#5C6C8F',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme; 