import type { ItemCategory } from '../../api/types'
import type { SortOption } from '../../store/useHomePageStore'

export const ITEMS_PER_PAGE = 10

export const categoryTitle: Record<ItemCategory, string> = {
  auto: 'Авто',
  real_estate: 'Недвижимость',
  electronics: 'Электроника',
}

export const sortOptions: Record<SortOption, string> = {
  newest: 'По новизне (сначала новые)',
  priceAsc: 'По цене (сначала дешевле)',
  priceDesc: 'По цене (сначала дороже)',
}

export const categoryOrder: ItemCategory[] = ['auto', 'electronics', 'real_estate']

export const COLORS = {
  pageBg: '#f7f8fa',
  panelBorder: '#e9edf3',
  panelShadow: '0 1px 4px rgba(20, 34, 60, 0.03)',
  title: '#222a39',
  muted: '#7d8695',
  controlBorder: '#e2e6ee',
  controlBg: '#ffffff',
  cardBorder: '#edf0f5',
  cardShadow: '0 1px 6px rgba(20, 34, 60, 0.04)',
  imageBg: '#f2f4f8',
  categoryBg: '#f4f6f9',
  categoryBorder: '#e3e8ef',
  categoryText: '#4a5466',
  price: '#3b4558',
  revisionBg: '#fff5dc',
  revisionBorder: '#ffe8b5',
  revisionText: '#b88d2b',
}

export const formatPrice = (price: number | null) =>
  price === null ? 'Цена не указана' : `${new Intl.NumberFormat('ru-RU').format(price)} ₽`
