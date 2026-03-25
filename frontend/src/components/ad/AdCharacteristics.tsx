import { Box, Stack, Typography } from '@mui/material'
import type { AdCharacteristic } from './adViewConfig'

type AdCharacteristicsProps = {
  characteristics: AdCharacteristic[]
}

export function AdCharacteristics({ characteristics }: AdCharacteristicsProps) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 30, color: '#2b3444' }}>
        Характеристики
      </Typography>
      <Stack spacing={1} sx={{ mt: 1 }}>
        {characteristics.map((field) => (
          <Stack key={field.key} direction="row" spacing={4} sx={{ fontSize: 22, lineHeight: 1.3 }}>
            <Typography sx={{ minWidth: 170, color: '#77808f', fontSize: 'inherit' }}>
              {field.label}
            </Typography>
            <Typography sx={{ color: '#2f3746', fontSize: 'inherit' }}>{field.value}</Typography>
          </Stack>
        ))}
        {characteristics.length === 0 && (
          <Typography sx={{ color: '#77808f', fontSize: 18 }}>
            Характеристики пока не заполнены.
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
