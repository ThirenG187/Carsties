'use server'

import { fetchWrapper } from '@/lib/fetchWrapper'
import { FieldValues } from 'react-hook-form'

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post('auctions', data)
}
