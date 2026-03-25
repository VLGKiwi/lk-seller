import { useMemo } from 'react'
import { Alert, Box, Divider, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { AdCharacteristics } from '../components/ad/AdCharacteristics'
import { AdDescription } from '../components/ad/AdDescription'
import { AdImagePanel } from '../components/ad/AdImagePanel'
import { AdRevisionNotice } from '../components/ad/AdRevisionNotice'
import { AdTopBar } from '../components/ad/AdTopBar'
import { getCharacteristics, getMissingRequiredFields } from '../components/ad/adViewConfig'
import { useItemByIdQuery } from '../hooks/useItemByIdQuery'

export function AdPage() {
  const { id } = useParams()
  const itemId = Number(id)

  const { data: item, isPending, isError } = useItemByIdQuery(itemId)

  const characteristics = useMemo(() => {
    if (!item) return []
    return getCharacteristics(item)
  }, [item])

  const missingRequiredFields = useMemo(() => {
    if (!item) return []
    return getMissingRequiredFields(item)
  }, [item])

  if (!Number.isFinite(itemId)) {
    return <Alert severity="error">Некорректный ID объявления.</Alert>
  }

  if (isPending) {
    return <Typography>Загрузка объявления...</Typography>
  }

  if (isError || !item) {
    return <Alert severity="error">Не удалось загрузить объявление.</Alert>
  }

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <AdTopBar item={item} />

      <Divider />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.6fr' }, gap: 3 }}>
        <AdImagePanel />

        <Stack spacing={3}>
          {item.needsRevision && <AdRevisionNotice missingRequiredFields={missingRequiredFields} />}
          <AdCharacteristics characteristics={characteristics} />
        </Stack>
      </Box>

      <AdDescription description={item.description} />

      <MuiLink component={RouterLink} to="/ads" underline="hover" sx={{ fontSize: 18 }}>
        ← К списку объявлений
      </MuiLink>
    </Stack>
  )
}
