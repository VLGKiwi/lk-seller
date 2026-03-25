import type { ItemCategory, ItemDetailsResponse } from '../../api/types'

export const DESCRIPTION_LIMIT = 1000

export type FieldType = 'text' | 'number' | 'select'

export type FieldConfig = {
  key: string
  label: string
  type: FieldType
  options?: Array<{ value: string; label: string }>
}

export type EditFormState = {
  category: ItemCategory
  title: string
  price: string
  description: string
  params: Record<string, string>
}

export const categoryOptions: Array<{ value: ItemCategory; label: string }> = [
  { value: 'electronics', label: 'Электроника' },
  { value: 'auto', label: 'Транспорт' },
  { value: 'real_estate', label: 'Недвижимость' },
]

export const fieldConfigByCategory: Record<ItemCategory, FieldConfig[]> = {
  electronics: [
    {
      key: 'type',
      label: 'Тип',
      type: 'select',
      options: [
        { value: 'phone', label: 'Смартфон' },
        { value: 'laptop', label: 'Ноутбук' },
        { value: 'misc', label: 'Другое' },
      ],
    },
    { key: 'brand', label: 'Бренд', type: 'text' },
    { key: 'model', label: 'Модель', type: 'text' },
    { key: 'color', label: 'Цвет', type: 'text' },
    {
      key: 'condition',
      label: 'Состояние',
      type: 'select',
      options: [
        { value: 'new', label: 'Новое' },
        { value: 'used', label: 'Б/у' },
      ],
    },
  ],
  auto: [
    { key: 'brand', label: 'Бренд', type: 'text' },
    { key: 'model', label: 'Модель', type: 'text' },
    { key: 'yearOfManufacture', label: 'Год выпуска', type: 'number' },
    {
      key: 'transmission',
      label: 'Коробка передач',
      type: 'select',
      options: [
        { value: 'automatic', label: 'Автомат' },
        { value: 'manual', label: 'Механика' },
      ],
    },
    { key: 'mileage', label: 'Пробег', type: 'number' },
    { key: 'enginePower', label: 'Мощность двигателя', type: 'number' },
  ],
  real_estate: [
    {
      key: 'type',
      label: 'Тип',
      type: 'select',
      options: [
        { value: 'flat', label: 'Квартира' },
        { value: 'house', label: 'Дом' },
        { value: 'room', label: 'Комната' },
      ],
    },
    { key: 'address', label: 'Адрес', type: 'text' },
    { key: 'area', label: 'Площадь', type: 'number' },
    { key: 'floor', label: 'Этаж', type: 'number' },
  ],
}

export function buildInitialForm(item: ItemDetailsResponse): EditFormState {
  const rawParams = item.params as Record<string, unknown>
  const params: Record<string, string> = {}
  Object.entries(rawParams).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    params[key] = String(value)
  })

  return {
    category: item.category,
    title: item.title,
    price: item.price === null ? '' : String(item.price),
    description: item.description ?? '',
    params,
  }
}

export function normalizeParams(state: EditFormState): Record<string, string | number> {
  const nextParams: Record<string, string | number> = {}
  for (const config of fieldConfigByCategory[state.category]) {
    const raw = (state.params[config.key] ?? '').trim()
    if (!raw) continue

    if (config.type === 'number') {
      const parsed = Number(raw)
      if (Number.isFinite(parsed)) nextParams[config.key] = parsed
      continue
    }

    nextParams[config.key] = raw
  }
  return nextParams
}
