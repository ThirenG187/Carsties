'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'

export const createBidForAuction = async (
  auctionId: string,
  amount: number
) => {
  return await fetchWrapper.post(
    `bids?auctionId=${auctionId}&amount=${amount}`,
    {}
  )
}
