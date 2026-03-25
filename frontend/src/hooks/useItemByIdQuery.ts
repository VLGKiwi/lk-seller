import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../api/client'
import type { ItemDetailsResponse } from '../api/types'

export function useItemByIdQuery(itemId: number) {
  return useQuery({
    queryKey: ['item', itemId],
    queryFn: async () => {
      const { data } = await apiClient.get<ItemDetailsResponse>(`/items/${itemId}`)
      return data
    },
    enabled: Number.isFinite(itemId),
  })
}
