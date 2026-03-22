import type { ReactNode } from 'react'
import { NavLink, Outlet, useMatch } from 'react-router-dom'
import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'

function NavButton({ to, children }: { to: string; children: ReactNode }) {
  const match = useMatch({ path: to, end: true })
  const isActive = !!match
  return (
    <Button
      color="inherit"
      component={NavLink}
      to={to}
      sx={{
        color: isActive ? '#fff' : 'rgba(255,255,255,0.85)',
        fontWeight: isActive ? 600 : 400,
      }}
    >
      {children}
    </Button>
  )
}

export function AppLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            lk-seller
          </Typography>
          <NavButton to="/">Главная</NavButton>
          <NavButton to="/about">О проекте</NavButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ py: 3, flex: 1 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
