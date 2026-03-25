import { Box, Paper } from '@mui/material'

export function AdImagePanel() {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: 420,
        borderRadius: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f5f7',
      }}
    >
      <Box
        sx={{
          width: 170,
          height: 124,
          border: '7px solid #9da2a8',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '6px solid #9da2a8',
            left: 12,
            top: 12,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 80,
            height: 48,
            borderLeft: '7px solid #9da2a8',
            borderBottom: '7px solid #9da2a8',
            transform: 'skewX(-26deg) rotate(-26deg)',
            left: 42,
            bottom: 14,
          },
        }}
      />
    </Paper>
  )
}
