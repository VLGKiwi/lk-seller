import { create } from 'zustand'

type AppState = {
  sellerName: string
  setSellerName: (name: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  sellerName: 'Продавец',
  setSellerName: (sellerName) => set({ sellerName }),
}))
