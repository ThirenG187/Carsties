'use client'

import useAuctionParams from '@/hooks/useAuctionParams'
import { Car } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { reset } = useAuctionParams()

  const onResetHandler = () => {
    if (pathname !== '/') router.push('/')
    reset()
  }

  return (
    <div
      onClick={onResetHandler}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500"
    >
      <Car size={34} />
      <Link href="/">Carsties Auctions</Link>
    </div>
  )
}

export default Logo
