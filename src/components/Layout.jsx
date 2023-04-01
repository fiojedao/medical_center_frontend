import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { appTheme } from '../themes/theme'
import Container from '@mui/material/Container'
import { Toaster } from 'react-hot-toast'


export function Layout ({ children }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Header />
      <Container maxWidth='xl' style={{ paddingTop: '1rem', paddingBottom: '4.5rem' }}>
        <Toaster position='top-center'/>
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  )
}
