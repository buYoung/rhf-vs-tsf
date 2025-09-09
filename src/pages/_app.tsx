import * as React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/layout/Header';

// MUI v7: enable CSS theme variables and built-in color schemes
const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: true,
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>RHF vs TSF</title>
      </Head>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

