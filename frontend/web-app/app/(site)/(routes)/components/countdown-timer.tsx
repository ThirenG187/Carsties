'use client'

import { useBidStore } from '@/hooks/useBidStore'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Countdown, { zeroPad } from 'react-countdown'

interface CountdownTimerProps {
  auctionEnd: string
}

const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: {
  days: any
  hours: any
  minutes: any
  seconds: any
  completed: any
}) => {
  return (
    <div
      className={cn(
        'border-2 boder-white text-white py-1 px-2 rounded-lg flex justify-center',
        completed
          ? 'bg-red-600'
          : days === 0 && hours < 10
          ? 'bg-amber-600'
          : 'bg-green-600'
      )}
    >
      {completed ? (
        <span>Auction finished</span>
      ) : (
        <span suppressHydrationWarning>
          {zeroPad(days)}: {zeroPad(hours)}:{zeroPad(minutes)}:
          {zeroPad(seconds)}
        </span>
      )}
    </div>
  )
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ auctionEnd }) => {
  const { setOpen } = useBidStore()
  const pathname = usePathname()

  const auctionFinished = () => {
    if (pathname.startsWith('/auctions/details')) {
      setOpen(false)
    }
  }

  return (
    <div>
      <Countdown
        onComplete={auctionFinished}
        date={auctionEnd}
        renderer={renderer}
      />
    </div>
  )
}

const Completionist = () => <span>You are good to go!</span>

export default CountdownTimer
