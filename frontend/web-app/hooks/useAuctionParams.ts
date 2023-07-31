import { create } from 'zustand'

interface ParamsStore {
  pageNumber: number
  pageSize: number
  pageCount: number
  searchTerm: string
  searchValue: string
  orderBy: string
  filterBy: string
  seller?: string
  winner?: string
}

type Actions = {
  setParams: (params: Partial<ParamsStore>) => void
  reset: () => void
  setSearchValue: (value: string) => void
}

const initialState: ParamsStore = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: '',
  searchValue: '',
  orderBy: 'make',
  filterBy: 'live',
  seller: undefined,
  winner: undefined,
}

const useAuctionParams = create<ParamsStore & Actions>((set) => ({
  ...initialState,
  setParams: (newParams: Partial<ParamsStore>) =>
    set((state) => {
      if (newParams.pageNumber) {
        return { ...state, pageNumber: newParams.pageNumber }
      } else {
        return { ...state, ...newParams, pageNumber: 1 }
      }
    }),
  reset: () => set(initialState),
  setSearchValue: (value: string) =>
    set((state) => ({
      ...state,
      searchValue: value,
    })),
}))

export default useAuctionParams
