'use client'

import useAuctionParams from '@/hooks/useAuctionParams'
import { Car } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  const { reset } = useAuctionParams()

  return (
    <div
      onClick={reset}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500"
    >
      <Car size={34} />
      <Link href="/">Carsties Auctions</Link>
    </div>
  )
}

export default Logo
