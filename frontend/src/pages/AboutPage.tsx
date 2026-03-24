import { Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function AboutPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        О проекте
      </Typography>
      <Typography color="text.secondary">
        Каркас личного кабинета продавца: React, TypeScript, Vite, React Router, MUI,
        Zustand, TanStack Query и Axios.
      </Typography>
      <MuiLink component={RouterLink} to="/" underline="hover">
        ← На главную
      </MuiLink>
    </Stack>
  )
}
