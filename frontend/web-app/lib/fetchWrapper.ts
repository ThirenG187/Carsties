import { getTokenWorkaround } from '@/actions/auth/getTokenWorkaround'

const baseUrl = process.env.API_URL

const get = async (url: string) => {
  const requestOptions = {
    method: 'GET',
    next: { revalidate: 0 },
    revalidate: 0,
    //headers: {},
  }

  const response = await fetch(baseUrl + url, requestOptions)

  return await handleResponse(response)
}

const post = async (url: string, body: {}) => {
  const requestOptions = {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(body),
    next: { revalidate: 0 },
    revalidate: 0,
  }

  const response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

const put = async (url: string, body: {}) => {
  const requestOptions = {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(body),
    next: { revalidate: 0 },
    revalidate: 0,
  }

  const response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

const del = async (url: string) => {
  const requestOptions = {
    method: 'DELETE',
    headers: await getHeaders(),
    next: { revalidate: 0 },
    revalidate: 0,
  }

  const response = await fetch(baseUrl + url, requestOptions)
  return await handleResponse(response)
}

const getHeaders = async () => {
  const token = await getTokenWorkaround()
  const headers = { 'Content-type': 'application/json' } as any
  if (token) {
    headers.Authorization = 'Bearer ' + token.access_token
  }
  return headers
}

const handleResponse = async (response: Response) => {
  const text = await response.text()
  // const data = text && JSON.parse(text)
  let data

  try {
    data = JSON.parse(text)
  } catch (error) {
    data = text
  }

  if (response.ok) {
    return data || response.statusText
  } else {
    const error = {
      status: response.status,
      message: typeof data === 'string' ? data : response.statusText,
    }

    return { error }
  }
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
}
