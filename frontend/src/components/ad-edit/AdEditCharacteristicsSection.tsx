import { Box, MenuItem, Stack, TextField, Typography } from '@mui/material'
import type { FieldConfig } from './adEditConfig'

type AdEditCharacteristicsSectionProps = {
  fields: FieldConfig[]
  params: Record<string, string>
  onParamChange: (key: string, value: string) => void
}

export function AdEditCharacteristicsSection({
  fields,
  params,
  onParamChange,
}: AdEditCharacteristicsSectionProps) {
  return (
    <>
      <Typography sx={{ fontSize: 34, fontWeight: 600, color: '#2a3240', mb: 1.5 }}>
        Характеристики
      </Typography>
      <Stack spacing={1.5} sx={{ maxWidth: 560 }}>
        {fields.map((field) => (
          <Box key={field.key}>
            <Typography sx={{ mb: 0.75 }}>{field.label}</Typography>
            {field.type === 'select' ? (
              <TextField
                select
                fullWidth
                size="small"
                value={params[field.key] ?? ''}
                onChange={(event) => onParamChange(field.key, event.target.value)}
              >
                <MenuItem value="">Выберите...</MenuItem>
                {field.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                size="small"
                value={params[field.key] ?? ''}
                onChange={(event) => onParamChange(field.key, event.target.value)}
                type={field.type === 'number' ? 'number' : 'text'}
                placeholder={field.label}
              />
            )}
          </Box>
        ))}
      </Stack>
    </>
  )
}
