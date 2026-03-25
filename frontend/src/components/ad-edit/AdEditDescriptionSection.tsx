import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { DESCRIPTION_LIMIT } from './adEditConfig'

type AdEditDescriptionSectionProps = {
  description: string
  onDescriptionChange: (value: string) => void
  onImproveDescriptionClick: () => void
  onApplySuggestedDescription: () => void
  onCloseDescriptionSuggestion: () => void
  onRetryDescriptionSuggestion: () => void
  descriptionSuggestionText?: string | null
  isDescriptionSuggestionLoading?: boolean
}

export function AdEditDescriptionSection({
  description,
  onDescriptionChange,
  onImproveDescriptionClick,
  onApplySuggestedDescription,
  onCloseDescriptionSuggestion,
  onRetryDescriptionSuggestion,
  descriptionSuggestionText,
  isDescriptionSuggestionLoading = false,
}: AdEditDescriptionSectionProps) {
  return (
    <>
      <Typography sx={{ fontSize: 34, fontWeight: 600, color: '#2a3240', mb: 1 }}>
        Описание
      </Typography>
      <Paper variant="outlined" sx={{ p: 1.25, borderColor: '#7f91bf', backgroundColor: '#f6f7fa' }}>
        <TextField
          fullWidth
          multiline
          minRows={4}
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          inputProps={{ maxLength: DESCRIPTION_LIMIT }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiInputBase-root': { p: 0 },
          }}
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
          <Button
            variant="text"
            sx={{ color: '#f59d1a', backgroundColor: '#fff5e8', borderRadius: 1.5, px: 1.5 }}
            onClick={onImproveDescriptionClick}
            disabled={isDescriptionSuggestionLoading}
          >
            {isDescriptionSuggestionLoading
              ? 'Запрос...'
              : description.trim()
                ? '💡 Улучшить описание'
                : '💡 Придумать описание'}
          </Button>
          <Typography sx={{ color: '#9aa3b1' }}>
            {description.length} / {DESCRIPTION_LIMIT}
          </Typography>
        </Stack>
      </Paper>
      {descriptionSuggestionText && (
        <Stack spacing={1} sx={{ mt: 1.25, maxWidth: 620 }}>
          <Paper variant="outlined" sx={{ p: 1.5, borderColor: '#e1e6f0' }}>
            <Typography sx={{ fontWeight: 700, mb: 0.75 }}>Ответ AI:</Typography>
            <Typography sx={{ whiteSpace: 'pre-line', fontSize: 14, lineHeight: 1.4 }}>
              {descriptionSuggestionText}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1.25 }}>
              <Button variant="contained" size="small" onClick={onApplySuggestedDescription}>
                Применить
              </Button>
              <Button variant="outlined" size="small" onClick={onCloseDescriptionSuggestion}>
                Закрыть
              </Button>
            </Stack>
          </Paper>
          <Button
            variant="text"
            sx={{ alignSelf: 'flex-start', color: '#f59d1a', backgroundColor: '#fff5e8', borderRadius: 1.5, px: 1.5 }}
            onClick={onRetryDescriptionSuggestion}
            disabled={isDescriptionSuggestionLoading}
          >
            ⟳ Повторить запрос
          </Button>
        </Stack>
      )}
    </>
  )
}
