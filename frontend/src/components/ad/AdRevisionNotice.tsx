import { Box, Paper, Typography } from '@mui/material'

type AdRevisionNoticeProps = {
  missingRequiredFields: string[]
}

export function AdRevisionNotice({ missingRequiredFields }: AdRevisionNoticeProps) {
  return (
    <Paper
      sx={{
        p: 2,
        backgroundColor: '#f8f2e7',
        borderRadius: 1.5,
        border: '1px solid #efd8af',
        boxShadow: '0 2px 10px rgba(20, 34, 60, 0.08)',
        maxWidth: 760,
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 22, color: '#2e3748' }}>
        Требуются доработки
      </Typography>
      <Typography sx={{ mt: 0.5, color: '#3f4757', fontSize: 16 }}>
        У объявления не заполнены поля:
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 3, color: '#3f4757', fontSize: 16 }}>
        {missingRequiredFields.length > 0 ? (
          missingRequiredFields.map((fieldName) => <li key={fieldName}>{fieldName}</li>)
        ) : (
          <li>Описание</li>
        )}
      </Box>
    </Paper>
  )
}
