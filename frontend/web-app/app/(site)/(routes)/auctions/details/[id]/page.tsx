import { getAuctionDetails } from '@/actions/auctions/getAuctionDetails'
import Heading from '@/components/heading'
import CountdownTimer from '@/app/(site)/(routes)/components/countdown-timer'
import CardImage from '../../../components/card-image'
import DetailsGrid from './details-grid'
import { getCurrentUser } from '@/actions/auth/getCurrentUser'
import EditButton from './edit-button'
import DeleteButton from './delete-button'
import { getBidsForAuction } from '@/actions/bids/getBidsForAuction'
import BidItem from './bid-item'
import BidList from './bid-list'

interface DetailsPageProps {
  params: {
    id: string
  }
}

export const revalidate = 0

const DetailsPage: React.FC<DetailsPageProps> = async ({ params }) => {
  const details = await getAuctionDetails(params.id)
  const user = await getCurrentUser()
  const bids = await getBidsForAuction(params.id)

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${details.make} ${details.model}`} />
          {user?.username === details.seller && (
            <>
              {' '}
              <EditButton id={details.id} /> <DeleteButton id={details.id} />
            </>
          )}
        </div>
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>
          <CountdownTimer auctionEnd={details.auctionEnd} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <CardImage imageUrl={details.imageUrl} />
        </div>
        <BidList user={user} auction={details} />
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailsGrid auction={details} />
      </div>
    </>
  )
}

export default DetailsPage
