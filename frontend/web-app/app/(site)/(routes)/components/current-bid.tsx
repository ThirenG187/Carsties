'use client'

import { cn } from '@/lib/utils'

interface CurrentBidProps {
  amount?: number
  reservePrice: number
}

const CurrentBid: React.FC<CurrentBidProps> = ({ amount, reservePrice }) => {
  const text = amount ? '$' + amount : 'No Bids'
  const color = amount
    ? amount > reservePrice
      ? 'bg-green-600'
      : 'bg-amber-600'
    : 'bg-red-600'

  return (
    <div
      className={cn(
        'border-2 border-white text-white py-1 px-2 rounded-lg flex justify-center',
        color
      )}
    >
      {text}
    </div>
  )
}

export default CurrentBid
