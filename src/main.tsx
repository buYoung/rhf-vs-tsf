import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import './index.css'
import App from './App.tsx'

const theme = createTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
