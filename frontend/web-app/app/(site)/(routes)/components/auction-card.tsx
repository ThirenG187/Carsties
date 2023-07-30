import CountdownTimer from './countdown-timer'
import CardImage from './card-image'
import { Auction } from '@/types'

type AuctionCardProps = {
  auction: Auction
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  return (
    <a href="#">
      <div className="w-full overflow-hidden bg-gray-200 rounded-lg aspect-w-16 aspect-h-10">
        <div className="group">
          <CardImage imageUrl={auction.imageUrl} />
          <div className="absolute bottom-2 left-2">
            <CountdownTimer auctionEnd={auction.auctionEnd} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>
        <p className="text-sm font-semibold">{auction.year}</p>
      </div>
    </a>
  )
}

export default AuctionCard
