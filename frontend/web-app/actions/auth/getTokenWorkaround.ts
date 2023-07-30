'use server'

import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import { cookies, headers } from 'next/headers'

export const getTokenWorkaround = async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((x) => [x.name, x.value])
    ),
  } as NextApiRequest

  return await getToken({ req })
}
