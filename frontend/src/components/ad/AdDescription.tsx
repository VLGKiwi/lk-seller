import { Box, Typography } from '@mui/material'

type AdDescriptionProps = {
  description?: string
}

export function AdDescription({ description }: AdDescriptionProps) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 32, color: '#2b3444', mb: 1.5 }}>
        Описание
      </Typography>
      <Typography sx={{ color: '#2f3746', fontSize: 22, lineHeight: 1.45, maxWidth: 1200 }}>
        {description?.trim() || 'Описание пока не заполнено.'}
      </Typography>
    </Box>
  )
}
