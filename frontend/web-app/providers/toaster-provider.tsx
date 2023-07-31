'use client'

import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

interface ToasterProviderProps {}

const ToasterProvider: React.FC<ToasterProviderProps> = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <Toaster position="bottom-right" />
}

export default ToasterProvider
