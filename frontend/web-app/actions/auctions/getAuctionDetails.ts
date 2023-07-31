'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'
import { Auction } from '@/types'

export const getAuctionDetails = async (id: string): Promise<Auction> => {
  return await fetchWrapper.get(`auctions/${id}`)
}
