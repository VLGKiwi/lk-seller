export type ItemCategory = 'auto' | 'real_estate' | 'electronics'

export type Item = {
  id: number
  category: ItemCategory
  title: string
  description?: string
  price: number | null
  createdAt: string
  updatedAt: string
  params: Record<string, unknown>
}

export type ItemListEntry = {
  id?: number
  createdAt?: string
  category: ItemCategory
  title: string
  price: number | null
  needsRevision: boolean
}

export type ItemsResponse = {
  items: ItemListEntry[]
  total: number
}

export type ItemDetailsResponse = Item & {
  needsRevision: boolean
}

export type AiPriceSuggestionResponse = {
  answer: string
  suggestedPrice: number | null
  comparableCount: number
}

export type AiDescriptionSuggestionResponse = {
  answer: string
  description: string
}
