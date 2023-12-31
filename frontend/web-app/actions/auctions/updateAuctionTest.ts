'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'

export const updateAuctionTest = async () => {
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  }

  return await fetchWrapper.put(
    'auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c',
    data
  )
}
