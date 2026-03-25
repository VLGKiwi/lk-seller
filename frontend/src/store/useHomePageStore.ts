import { create } from 'zustand'
import type { ItemCategory } from '../api/types'

export type SortOption = 'newest' | 'priceAsc' | 'priceDesc'

type HomePageState = {
  search: string
  sort: SortOption
  selectedCategories: ItemCategory[]
  onlyNeedsRevision: boolean
  page: number
  setSearch: (value: string) => void
  setSort: (value: SortOption) => void
  toggleCategory: (value: ItemCategory) => void
  setOnlyNeedsRevision: (value: boolean) => void
  resetFilters: () => void
  setPage: (value: number) => void
}

const defaultState = {
  search: '',
  sort: 'newest' as SortOption,
  selectedCategories: [] as ItemCategory[],
  onlyNeedsRevision: false,
  page: 1,
}

export const useHomePageStore = create<HomePageState>((set) => ({
  ...defaultState,
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((value) => value !== category)
        : [...state.selectedCategories, category],
    })),
  setOnlyNeedsRevision: (onlyNeedsRevision) => set({ onlyNeedsRevision }),
  resetFilters: () => set({ selectedCategories: [], onlyNeedsRevision: false }),
  setPage: (page) => set({ page }),
}))
