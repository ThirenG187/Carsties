'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'
import { Bid } from '@/types'

export const getBidsForAuction = async (id: string): Promise<Bid[]> => {
  return await fetchWrapper.get(`bids/${id}`)
}
