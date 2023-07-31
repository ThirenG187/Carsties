'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'
import { revalidatePath } from 'next/cache'
import { FieldValues } from 'react-hook-form'

export const updateAuction = async (id: string, data: FieldValues) => {
  const res = await fetchWrapper.put(`auctions/${id}`, data)
  return res
}
