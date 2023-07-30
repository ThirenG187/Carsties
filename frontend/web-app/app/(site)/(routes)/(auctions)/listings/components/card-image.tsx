'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

interface CardImageProps {
  imageUrl: string
}

const CardImage: React.FC<CardImageProps> = ({ imageUrl }) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Image
      src={imageUrl}
      alt="Car Image"
      fill
      priority
      className={
        (cn('object-cover duration-700 ease-in-out hover:opacity-75'),
        isLoading
          ? 'grayscale blur-2xl scale-110 transition duration-700'
          : 'grayscale-0 blur-0 scale-100 transition duration-700 group-hover:opacity-60')
      }
      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
      onLoadingComplete={() => setIsLoading(false)}
    />
  )
}

export default CardImage
