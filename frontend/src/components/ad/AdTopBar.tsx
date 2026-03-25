import { Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { ItemDetailsResponse } from '../../api/types'
import { categoryLabel, formatDateTime, formatPrice } from './adViewConfig'

type AdTopBarProps = {
  item: ItemDetailsResponse
}

export function AdTopBar({ item }: AdTopBarProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography sx={{ fontSize: 36, lineHeight: 1.1, fontWeight: 600, color: '#2a3240' }}>
          {item.title}
        </Typography>
        <Typography sx={{ mt: 1, color: '#7a8393' }}>{categoryLabel[item.category]}</Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to={`/ads/${item.id}/edit`}
          sx={{
            mt: 2,
            borderRadius: 1.5,
            px: 2,
            height: 38,
            fontSize: 15,
            fontWeight: 500,
            backgroundColor: '#2f98f4',
            '&:hover': { backgroundColor: '#2189e3' },
          }}
        >
          Редактировать
        </Button>
      </Box>

      <Stack alignItems="flex-end" spacing={0.5}>
        <Typography sx={{ fontSize: 34, lineHeight: 1.05, fontWeight: 600, color: '#2d3645' }}>
          {formatPrice(item.price)}
        </Typography>
        <Typography sx={{ color: '#8b93a1', fontSize: 16 }}>
          Опубликовано: {formatDateTime(item.createdAt)}
        </Typography>
        <Typography sx={{ color: '#8b93a1', fontSize: 16 }}>
          Отредактировано: {formatDateTime(item.updatedAt)}
        </Typography>
      </Stack>
    </Stack>
  )
}
