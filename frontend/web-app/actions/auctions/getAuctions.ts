'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'
import { Auction, PagedResult } from '@/types'

export const getAuctionsResponse = async (
  query: string
): Promise<PagedResult<Auction>> => {
  return await fetchWrapper.get(`search${query}`)
}
