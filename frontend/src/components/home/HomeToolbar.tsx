import { InputAdornment, IconButton, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import type { SortOption } from '../../store/useHomePageStore'
import { COLORS, sortOptions } from './homeConfig'

type HomeToolbarProps = {
  search: string
  sort: SortOption
  onSearchChange: (value: string) => void
  onSortChange: (value: SortOption) => void
}

export function HomeToolbar({ search, sort, onSearchChange, onSortChange }: HomeToolbarProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1,
        borderRadius: 2.5,
        borderColor: COLORS.panelBorder,
        backgroundColor: '#fff',
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems={{ md: 'center' }}>
        <TextField
          placeholder="Найти объявление..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          size="small"
          sx={{
            flex: 1,
            backgroundColor: COLORS.controlBg,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2.2,
              height: 44,
              fontSize: 14,
              '& fieldset': {
                borderColor: COLORS.controlBorder,
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography sx={{ fontSize: 18, color: COLORS.muted }}>⌕</Typography>
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={0.75}>
          <IconButton
            size="small"
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1.5,
              border: `1px solid ${COLORS.controlBorder}`,
              backgroundColor: '#f3f8ff',
              color: '#4c8ef6',
              fontSize: 18,
            }}
          >
            ▦
          </IconButton>
          <IconButton
            size="small"
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1.5,
              border: `1px solid ${COLORS.controlBorder}`,
              backgroundColor: COLORS.controlBg,
              color: '#98a0ae',
              fontSize: 18,
            }}
          >
            ☰
          </IconButton>
        </Stack>
        <Select
          size="small"
          value={sort}
          onChange={(event) => onSortChange(event.target.value as SortOption)}
          sx={{
            minWidth: 272,
            backgroundColor: COLORS.controlBg,
            borderRadius: 2.2,
            height: 44,
            fontSize: 14,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: COLORS.controlBorder,
            },
          }}
        >
          {Object.entries(sortOptions).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Paper>
  )
}
