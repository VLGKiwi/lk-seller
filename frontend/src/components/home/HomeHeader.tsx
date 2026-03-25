import { Box, Typography } from '@mui/material'
import { COLORS } from './homeConfig'

type HomeHeaderProps = {
  total: number
}

export function HomeHeader({ total }: HomeHeaderProps) {
  return (
    <Box sx={{ mb: 0.5 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: 34, md: 40 },
          lineHeight: 1.1,
          fontWeight: 700,
          mb: 0.25,
          color: COLORS.title,
        }}
      >
        Мои объявления
      </Typography>
      <Typography sx={{ color: COLORS.muted, fontSize: 28, lineHeight: 1 }}>
        {total} объявлений
      </Typography>
    </Box>
  )
}
