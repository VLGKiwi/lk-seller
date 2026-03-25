import { useEffect, useMemo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Alert, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { apiClient } from '../api/client'
import type {
  AiDescriptionSuggestionResponse,
  AiPriceSuggestionResponse,
  ItemCategory,
} from '../api/types'
import { AdEditBasicSection } from '../components/ad-edit/AdEditBasicSection'
import { AdEditCharacteristicsSection } from '../components/ad-edit/AdEditCharacteristicsSection'
import { AdEditDescriptionSection } from '../components/ad-edit/AdEditDescriptionSection'
import {
  buildInitialForm,
  fieldConfigByCategory,
  normalizeParams,
  type EditFormState,
} from '../components/ad-edit/adEditConfig'
import { useItemByIdQuery } from '../hooks/useItemByIdQuery'
import { useAdEditStore } from '../store/useAdEditStore'

export function AdEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const itemId = Number(id)
  const draftKey = `ad-edit-draft:${itemId}`

  const form = useAdEditStore((state) => state.form)
  const restoredDraft = useAdEditStore((state) => state.restoredDraft)
  const errors = useAdEditStore((state) => state.errors)
  const priceSuggestion = useAdEditStore((state) => state.priceSuggestion)
  const descriptionSuggestion = useAdEditStore((state) => state.descriptionSuggestion)
  const setForm = useAdEditStore((state) => state.setForm)
  const patchForm = useAdEditStore((state) => state.patchForm)
  const updateParam = useAdEditStore((state) => state.updateParam)
  const setRestoredDraft = useAdEditStore((state) => state.setRestoredDraft)
  const setErrors = useAdEditStore((state) => state.setErrors)
  const setPriceSuggestion = useAdEditStore((state) => state.setPriceSuggestion)
  const setDescriptionSuggestion = useAdEditStore((state) => state.setDescriptionSuggestion)
  const resetStore = useAdEditStore((state) => state.reset)

  const { data: item, isPending, isError } = useItemByIdQuery(itemId)

  useEffect(() => {
    return () => resetStore()
  }, [resetStore])

  useEffect(() => {
    if (!item) return

    const initial = buildInitialForm(item)
    const draftRaw = localStorage.getItem(draftKey)
    if (!draftRaw) {
      setForm(initial)
      return
    }

    try {
      const draft = JSON.parse(draftRaw) as Partial<EditFormState>
      if (
        draft &&
        typeof draft.title === 'string' &&
        typeof draft.price === 'string' &&
        typeof draft.description === 'string' &&
        typeof draft.params === 'object' &&
        draft.params &&
        (draft.category === 'electronics' || draft.category === 'auto' || draft.category === 'real_estate')
      ) {
        setForm({
          category: draft.category,
          title: draft.title,
          price: draft.price,
          description: draft.description,
          params: draft.params as EditFormState['params'],
        })
        setRestoredDraft(true)
        return
      }
    } catch {
      // Ignore invalid draft and continue with server data.
    }

    setForm(initial)
  }, [item, draftKey])

  useEffect(() => {
    if (!form) return
    localStorage.setItem(draftKey, JSON.stringify(form))
  }, [form, draftKey])

  const categoryFields = useMemo(() => {
    if (!form) return []
    return fieldConfigByCategory[form.category]
  }, [form])

  const saveMutation = useMutation({
    mutationFn: async (state: EditFormState) => {
      await apiClient.put(`/items/${itemId}`, {
        category: state.category,
        title: state.title.trim(),
        price: Number(state.price),
        description: state.description.trim() || undefined,
        params: normalizeParams(state),
      })
    },
    onSuccess: async () => {
      localStorage.removeItem(draftKey)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['item', itemId] }),
        queryClient.invalidateQueries({ queryKey: ['items'] }),
      ])
      resetStore()
      navigate(`/ads/${itemId}`)
    },
  })

  const priceSuggestionMutation = useMutation({
    mutationFn: async (state: EditFormState) => {
      const response = await apiClient.post<AiPriceSuggestionResponse>('/ai/price-suggestion', {
        itemId,
        category: state.category,
        title: state.title.trim(),
        description: state.description.trim() || undefined,
        price: state.price.trim() ? Number(state.price) : undefined,
        params: normalizeParams(state),
      })
      return response.data
    },
    onSuccess: (result) => {
      setPriceSuggestion(result)
    },
  })

  const descriptionSuggestionMutation = useMutation({
    mutationFn: async (state: EditFormState) => {
      const response = await apiClient.post<AiDescriptionSuggestionResponse>('/ai/description-suggestion', {
        itemId,
        category: state.category,
        title: state.title.trim(),
        description: state.description.trim() || undefined,
        price: state.price.trim() ? Number(state.price) : undefined,
        params: normalizeParams(state),
      })
      return response.data
    },
    onSuccess: (result) => {
      setDescriptionSuggestion(result)
    },
  })

  if (!Number.isFinite(itemId)) {
    return <Alert severity="error">Некорректный ID объявления.</Alert>
  }

  if (isPending || !form) {
    return <Typography>Загрузка формы...</Typography>
  }

  if (isError || !item) {
    return <Alert severity="error">Не удалось загрузить объявление.</Alert>
  }

  const onSave = () => {
    const nextErrors: Record<string, string> = {}

    if (!form.category) nextErrors.category = 'Выберите категорию'
    if (!form.title.trim()) nextErrors.title = 'Название обязательно'

    const parsedPrice = Number(form.price)
    if (!form.price.trim()) {
      nextErrors.price = 'Цена обязательна'
    } else if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      nextErrors.price = 'Укажите корректную цену'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    saveMutation.mutate(form)
  }

  return (
    <Paper
      variant="outlined"
      sx={{ p: 3, borderRadius: 2.5, backgroundColor: '#f7f8fa', width: '100%' }}
    >
      <Typography sx={{ fontSize: 44, fontWeight: 600, mb: 2.5, color: '#2a3240' }}>
        Редактирование объявления
      </Typography>

      {restoredDraft && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Черновик восстановлен из localStorage.
        </Alert>
      )}
      {saveMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Не удалось сохранить изменения.
        </Alert>
      )}
      {priceSuggestionMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Не удалось получить рекомендацию по цене.
        </Alert>
      )}
      {descriptionSuggestionMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Не удалось сгенерировать описание.
        </Alert>
      )}

      <AdEditBasicSection
        category={form.category}
        title={form.title}
        price={form.price}
        errors={errors}
        onCategoryChange={(value: ItemCategory) =>
          patchForm({ category: value })
        }
        onTitleChange={(value) => patchForm({ title: value })}
        onPriceChange={(value) => patchForm({ price: value })}
        onMarketPriceClick={() => priceSuggestionMutation.mutate(form)}
        onApplySuggestedPrice={() => {
          if (!priceSuggestion?.suggestedPrice) return
          patchForm({ price: String(priceSuggestion.suggestedPrice) })
        }}
        onClosePriceSuggestion={() => setPriceSuggestion(null)}
        onRetryPriceSuggestion={() => priceSuggestionMutation.mutate(form)}
        priceSuggestionText={priceSuggestion?.answer}
        isPriceSuggestionLoading={priceSuggestionMutation.isPending}
      />

      <Divider sx={{ my: 2.5 }} />

      <AdEditCharacteristicsSection
        fields={categoryFields}
        params={form.params}
        onParamChange={updateParam}
      />

      <Divider sx={{ my: 2.5 }} />

      <AdEditDescriptionSection
        description={form.description}
        onDescriptionChange={(value) => patchForm({ description: value })}
        onImproveDescriptionClick={() => descriptionSuggestionMutation.mutate(form)}
        onApplySuggestedDescription={() => {
          if (!descriptionSuggestion?.description) return
          patchForm({ description: descriptionSuggestion.description })
        }}
        onCloseDescriptionSuggestion={() => setDescriptionSuggestion(null)}
        onRetryDescriptionSuggestion={() => descriptionSuggestionMutation.mutate(form)}
        descriptionSuggestionText={descriptionSuggestion?.answer}
        isDescriptionSuggestionLoading={descriptionSuggestionMutation.isPending}
      />

      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={onSave} disabled={saveMutation.isPending}>
          {saveMutation.isPending ? 'Сохраняем...' : 'Сохранить'}
        </Button>
        <Button variant="outlined" onClick={() => navigate(`/ads/${itemId}`)} disabled={saveMutation.isPending}>
          Отменить
        </Button>
      </Stack>
    </Paper>
  )
}