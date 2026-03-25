import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Paper, Switch, Typography } from '@mui/material'
import type { ItemCategory } from '../../api/types'
import { COLORS, categoryOrder, categoryTitle } from './homeConfig'

type HomeFiltersPanelProps = {
  selectedCategories: ItemCategory[]
  onlyNeedsRevision: boolean
  hasActiveFilters: boolean
  onToggleCategory: (value: ItemCategory) => void
  onOnlyNeedsRevisionChange: (value: boolean) => void
  onResetFilters: () => void
}

export function HomeFiltersPanel({
  selectedCategories,
  onlyNeedsRevision,
  hasActiveFilters,
  onToggleCategory,
  onOnlyNeedsRevisionChange,
  onResetFilters,
}: HomeFiltersPanelProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: { xs: '100%', lg: 290 },
        p: 2.25,
        borderRadius: 2.5,
        borderColor: COLORS.panelBorder,
        boxShadow: COLORS.panelShadow,
        backgroundColor: '#fff',
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 1.5, color: COLORS.title }}>Фильтры</Typography>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: COLORS.title }}>
        Категория
      </Typography>
      <FormGroup>
        {categoryOrder.map((category) => (
          <FormControlLabel
            key={category}
            sx={{ mb: 0.25 }}
            control={
              <Checkbox
                size="small"
                checked={selectedCategories.includes(category)}
                onChange={() => onToggleCategory(category)}
                sx={{ p: 0.5, mr: 0.75 }}
              />
            }
            label={<Typography sx={{ fontSize: 15, color: '#313a49' }}>{categoryTitle[category]}</Typography>}
          />
        ))}
      </FormGroup>
      <Divider sx={{ my: 1.5 }} />
      <Box sx={{ mt: 1 }}>
        <FormControlLabel
          sx={{ m: 0, width: '100%', justifyContent: 'space-between' }}
          labelPlacement="start"
          control={
            <Switch
              checked={onlyNeedsRevision}
              onChange={(event) => onOnlyNeedsRevisionChange(event.target.checked)}
              size="small"
            />
          }
          label={
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Только требующие доработок
            </Typography>
          }
        />
      </Box>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          mt: 2,
          height: 38,
          borderRadius: 2,
          borderColor: COLORS.controlBorder,
          backgroundColor: '#f5f7fb',
          color: hasActiveFilters ? '#798396' : '#a3abb8',
          '&:hover': {
            borderColor: COLORS.controlBorder,
            backgroundColor: '#f2f5fa',
          },
        }}
        disabled={!hasActiveFilters}
        onClick={onResetFilters}
      >
        Сбросить фильтры
      </Button>
    </Paper>
  )
}
