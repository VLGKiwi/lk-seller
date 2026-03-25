import { Box, Typography } from '@mui/material'

type RequiredLabelProps = {
  text: string
}

export function RequiredLabel({ text }: RequiredLabelProps) {
  return (
    <Typography sx={{ fontWeight: 600, mb: 0.75 }}>
      <Box component="span" sx={{ color: '#ff5a5a', mr: 0.5 }}>
        *
      </Box>
      {text}
    </Typography>
  )
}
