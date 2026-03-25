import { useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Alert, Box, Stack, Typography } from '@mui/material'
import { apiClient } from '../api/client'
import type { ItemsResponse } from '../api/types'
import { HomeFiltersPanel } from '../components/home/HomeFiltersPanel'
import { HomeHeader } from '../components/home/HomeHeader'
import { HomeItemsGrid } from '../components/home/HomeItemsGrid'
import { HomePaginationControls } from '../components/home/HomePaginationControls'
import { HomeToolbar } from '../components/home/HomeToolbar'
import { COLORS, ITEMS_PER_PAGE } from '../components/home/homeConfig'
import { useHomePageStore } from '../store/useHomePageStore'

export function HomePage() {
  const search = useHomePageStore((state) => state.search)
  const sort = useHomePageStore((state) => state.sort)
  const selectedCategories = useHomePageStore((state) => state.selectedCategories)
  const onlyNeedsRevision = useHomePageStore((state) => state.onlyNeedsRevision)
  const page = useHomePageStore((state) => state.page)
  const setSearch = useHomePageStore((state) => state.setSearch)
  const setSort = useHomePageStore((state) => state.setSort)
  const toggleCategory = useHomePageStore((state) => state.toggleCategory)
  const setOnlyNeedsRevision = useHomePageStore((state) => state.setOnlyNeedsRevision)
  const resetFilters = useHomePageStore((state) => state.resetFilters)
  const setPage = useHomePageStore((state) => state.setPage)

  const { data, isPending, isError } = useQuery({
    queryKey: ['items', search, selectedCategories, onlyNeedsRevision],
    queryFn: async () => {
      const { data: response } = await apiClient.get<ItemsResponse>('/items', {
        params: {
          q: search,
          categories: selectedCategories.length > 0 ? selectedCategories.join(',') : undefined,
          needsRevision: onlyNeedsRevision ? 'true' : undefined,
          limit: 500,
          skip: 0,
        },
      })
      return response
    },
  })

  const { data: summary } = useQuery({
    queryKey: ['items-summary-total'],
    queryFn: async () => {
      const { data: response } = await apiClient.get<ItemsResponse>('/items', {
        params: { limit: 1, skip: 0 },
      })
      return response.total
    },
  })

  const sortedItems = useMemo(() => {
    if (!data?.items) return []

    const list = [...data.items]
    if (sort === 'newest') {
      return list.sort(
        (a, b) => new Date(b.createdAt ?? 0).valueOf() - new Date(a.createdAt ?? 0).valueOf(),
      )
    }

    if (sort === 'priceAsc') {
      return list.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER))
    }

    return list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1))
  }, [data?.items, sort])

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / ITEMS_PER_PAGE))

  useEffect(() => {
    setPage(1)
  }, [search, sort, selectedCategories, onlyNeedsRevision, setPage])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages, setPage])

  const pagedItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return sortedItems.slice(start, start + ITEMS_PER_PAGE)
  }, [page, sortedItems])

  const hasItemsWithoutId = sortedItems.some((item) => !Number.isFinite(item.id))
  const hasActiveFilters = selectedCategories.length > 0 || onlyNeedsRevision

  return (
    <Stack spacing={2} sx={{ backgroundColor: COLORS.pageBg }}>
      <HomeHeader total={summary ?? data?.total ?? 0} />

      <HomeToolbar
        search={search}
        sort={sort}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />

      <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems="flex-start">
        <HomeFiltersPanel
          selectedCategories={selectedCategories}
          onlyNeedsRevision={onlyNeedsRevision}
          hasActiveFilters={hasActiveFilters}
          onToggleCategory={toggleCategory}
          onOnlyNeedsRevisionChange={setOnlyNeedsRevision}
          onResetFilters={resetFilters}
        />

        <Box sx={{ flex: 1, width: '100%' }}>
          {isPending && <Typography color="text.secondary">Загрузка объявлений...</Typography>}
          {isError && <Alert severity="error">Не удалось загрузить объявления.</Alert>}
          {hasItemsWithoutId && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Сервер вернул часть объявлений без `id`, поэтому они недоступны для открытия.
            </Alert>
          )}

          {!isPending && !isError && (
            <Stack spacing={2}>
              <HomeItemsGrid items={pagedItems} />
              <HomePaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
            </Stack>
          )}
        </Box>
      </Stack>
    </Stack>
  )
}
