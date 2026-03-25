import type { ItemDetailsResponse } from '../../api/types'

export type AdCharacteristic = {
  key: string
  label: string
  value: string
}

export const categoryLabel: Record<ItemDetailsResponse['category'], string> = {
  electronics: 'Электроника',
  auto: 'Транспорт',
  real_estate: 'Недвижимость',
}

const fieldLabels: Record<string, string> = {
  type: 'Тип',
  brand: 'Бренд',
  model: 'Модель',
  condition: 'Состояние',
  color: 'Цвет',
  address: 'Адрес',
  area: 'Площадь',
  floor: 'Этаж',
  yearOfManufacture: 'Год выпуска',
  transmission: 'Коробка передач',
  mileage: 'Пробег',
  enginePower: 'Мощность двигателя',
}

const valueLabels: Record<string, string> = {
  phone: 'Смартфон',
  laptop: 'Ноутбук',
  misc: 'Другое',
  new: 'Новое',
  used: 'Б/у',
  flat: 'Квартира',
  house: 'Дом',
  room: 'Комната',
  automatic: 'Автомат',
  manual: 'Механика',
}

const requiredFieldsByCategory: Record<ItemDetailsResponse['category'], string[]> = {
  electronics: ['type', 'brand', 'model', 'condition', 'color'],
  auto: ['brand', 'model', 'yearOfManufacture', 'transmission', 'mileage', 'enginePower'],
  real_estate: ['type', 'address', 'area', 'floor'],
}

const fieldOrderByCategory: Record<ItemDetailsResponse['category'], string[]> = {
  electronics: ['type', 'brand', 'model', 'condition', 'color'],
  auto: ['brand', 'model', 'yearOfManufacture', 'transmission', 'mileage', 'enginePower'],
  real_estate: ['type', 'address', 'area', 'floor'],
}

export const formatPrice = (price: number | null) =>
  price === null ? 'Цена не указана' : `${new Intl.NumberFormat('ru-RU').format(price)} ₽`

export const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(new Date(value))
    .replace(' в ', ' ')

export function getCharacteristics(item: ItemDetailsResponse): AdCharacteristic[] {
  const params = item.params as Record<string, unknown>
  return fieldOrderByCategory[item.category]
    .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map((key) => {
      const rawValue = params[key]
      const value = typeof rawValue === 'string' ? (valueLabels[rawValue] ?? rawValue) : String(rawValue)
      return { key, label: fieldLabels[key] ?? key, value }
    })
}

export function getMissingRequiredFields(item: ItemDetailsResponse): string[] {
  const params = item.params as Record<string, unknown>
  return requiredFieldsByCategory[item.category]
    .filter((key) => params[key] === undefined || params[key] === null || params[key] === '')
    .map((key) => fieldLabels[key] ?? key)
}
