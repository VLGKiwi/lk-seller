import { create } from 'zustand'
import type { AiDescriptionSuggestionResponse, AiPriceSuggestionResponse } from '../api/types'
import type { EditFormState } from '../components/ad-edit/adEditConfig'

type AdEditState = {
  form: EditFormState | null
  restoredDraft: boolean
  errors: Record<string, string>
  priceSuggestion: AiPriceSuggestionResponse | null
  descriptionSuggestion: AiDescriptionSuggestionResponse | null
  setForm: (form: EditFormState | null) => void
  patchForm: (patch: Partial<EditFormState>) => void
  updateParam: (key: string, value: string) => void
  setRestoredDraft: (value: boolean) => void
  setErrors: (errors: Record<string, string>) => void
  setPriceSuggestion: (value: AiPriceSuggestionResponse | null) => void
  setDescriptionSuggestion: (value: AiDescriptionSuggestionResponse | null) => void
  reset: () => void
}

const initialState = {
  form: null,
  restoredDraft: false,
  errors: {},
  priceSuggestion: null,
  descriptionSuggestion: null,
}

export const useAdEditStore = create<AdEditState>((set) => ({
  ...initialState,
  setForm: (form) => set({ form }),
  patchForm: (patch) =>
    set((state) => ({
      form: state.form ? { ...state.form, ...patch } : state.form,
    })),
  updateParam: (key, value) =>
    set((state) => ({
      form: state.form
        ? { ...state.form, params: { ...state.form.params, [key]: value } }
        : state.form,
    })),
  setRestoredDraft: (restoredDraft) => set({ restoredDraft }),
  setErrors: (errors) => set({ errors }),
  setPriceSuggestion: (priceSuggestion) => set({ priceSuggestion }),
  setDescriptionSuggestion: (descriptionSuggestion) => set({ descriptionSuggestion }),
  reset: () => set(initialState),
}))
