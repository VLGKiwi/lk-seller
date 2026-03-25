import { Outlet } from 'react-router-dom'
import { Box, Container } from '@mui/material'

export function AppLayout() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f6f7fb', py: { xs: 2, md: 3 } }}>
      <Container component="main" maxWidth={false} disableGutters>
        <Box sx={{ maxWidth: 1480, mx: 'auto', px: '32px' }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  )
}
