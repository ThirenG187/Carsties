'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'

export const deleteAuction = async (id: string) => {
  return await fetchWrapper.del(`auctions/${id}`)
}
