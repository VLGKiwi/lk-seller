import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import type { ItemCategory } from '../../api/types'
import { categoryOptions } from './adEditConfig'
import { RequiredLabel } from './RequiredLabel'

type AdEditBasicSectionProps = {
  category: ItemCategory
  title: string
  price: string
  errors: Record<string, string>
  onCategoryChange: (value: ItemCategory) => void
  onTitleChange: (value: string) => void
  onPriceChange: (value: string) => void
  onMarketPriceClick: () => void
  onApplySuggestedPrice: () => void
  onClosePriceSuggestion: () => void
  onRetryPriceSuggestion: () => void
  priceSuggestionText?: string | null
  isPriceSuggestionLoading?: boolean
}

export function AdEditBasicSection({
  category,
  title,
  price,
  errors,
  onCategoryChange,
  onTitleChange,
  onPriceChange,
  onMarketPriceClick,
  onApplySuggestedPrice,
  onClosePriceSuggestion,
  onRetryPriceSuggestion,
  priceSuggestionText,
  isPriceSuggestionLoading = false,
}: AdEditBasicSectionProps) {
  return (
    <>
      <Stack spacing={2.5} sx={{ maxWidth: 560 }}>
        <RequiredLabel text="Категория" />
        <TextField
          select
          size="small"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as ItemCategory)}
          error={Boolean(errors.category)}
          helperText={errors.category}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack spacing={2.5} sx={{ maxWidth: 820 }}>
        <Box>
          <RequiredLabel text="Название" />
          <TextField
            fullWidth
            size="small"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
        </Box>

        <Box>
          <RequiredLabel text="Цена" />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
            <TextField
              fullWidth
              size="small"
              value={price}
              onChange={(event) => onPriceChange(event.target.value)}
              error={Boolean(errors.price)}
              helperText={errors.price}
              type="number"
            />
            <Stack spacing={1} sx={{ width: { xs: '100%', md: 360 } }}>
              <Button
                variant="text"
                sx={{
                  alignSelf: 'flex-start',
                  whiteSpace: 'nowrap',
                  color: '#f59d1a',
                  backgroundColor: '#fff5e8',
                  borderRadius: 1.5,
                  px: 1.5,
                }}
                onClick={onMarketPriceClick}
                disabled={isPriceSuggestionLoading}
              >
                {isPriceSuggestionLoading ? 'Запрос...' : '💡 Узнать рыночную цену'}
              </Button>
              {priceSuggestionText && (
                <>
                  <Paper variant="outlined" sx={{ p: 1.5, borderColor: '#e1e6f0' }}>
                    <Typography sx={{ fontWeight: 700, mb: 0.75 }}>Ответ AI:</Typography>
                    <Typography sx={{ whiteSpace: 'pre-line', fontSize: 14, lineHeight: 1.4 }}>
                      {priceSuggestionText}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1.25 }}>
                      <Button variant="contained" size="small" onClick={onApplySuggestedPrice}>
                        Применить
                      </Button>
                      <Button variant="outlined" size="small" onClick={onClosePriceSuggestion}>
                        Закрыть
                      </Button>
                    </Stack>
                  </Paper>
                  <Button
                    variant="text"
                    sx={{
                      alignSelf: 'flex-start',
                      color: '#f59d1a',
                      backgroundColor: '#fff5e8',
                      borderRadius: 1.5,
                      px: 1.5,
                    }}
                    onClick={onRetryPriceSuggestion}
                    disabled={isPriceSuggestionLoading}
                  >
                    ⟳ Повторить запрос
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  )
}
