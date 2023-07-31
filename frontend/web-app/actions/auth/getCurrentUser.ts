'use server'

import { getSession } from '@/actions/auth/getSession'

export const getCurrentUser = async () => {
  try {
    const session = await getSession()

    if (!session) return null

    return session.user
  } catch (error) {
    return null
  }
}
