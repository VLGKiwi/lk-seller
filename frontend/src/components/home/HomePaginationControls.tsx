import { IconButton, Pagination, Stack } from '@mui/material'
import { COLORS } from './homeConfig'

type HomePaginationControlsProps = {
  page: number
  totalPages: number
  onPageChange: (value: number) => void
}

export function HomePaginationControls({ page, totalPages, onPageChange }: HomePaginationControlsProps) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center" justifyContent="center">
      <IconButton
        size="small"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        sx={{
          width: 30,
          height: 30,
          border: `1px solid ${COLORS.controlBorder}`,
          borderRadius: 1.5,
          color: '#97a0ae',
          backgroundColor: '#fff',
        }}
      >
        ‹
      </IconButton>
      <Pagination
        color="primary"
        shape="rounded"
        count={totalPages}
        page={page}
        onChange={(_, nextPage) => onPageChange(nextPage)}
        size="small"
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: 1.2,
            minWidth: 30,
            height: 30,
            margin: '0 1px',
            border: 'none',
            backgroundColor: 'transparent',
            color: '#647084',
            fontSize: 13,
            fontWeight: 500,
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            border: 'none',
            backgroundColor: '#3d82f6',
            color: '#ffffff',
          },
        }}
      />
      <IconButton
        size="small"
        disabled={page >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        sx={{
          width: 30,
          height: 30,
          border: `1px solid ${COLORS.controlBorder}`,
          borderRadius: 1.5,
          color: '#97a0ae',
          backgroundColor: '#fff',
        }}
      >
        ›
      </IconButton>
    </Stack>
  )
}
