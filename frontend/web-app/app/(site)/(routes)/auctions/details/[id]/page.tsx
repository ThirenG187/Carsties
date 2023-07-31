import { getAuctionDetails } from '@/actions/auctions/getAuctionDetails'
import Heading from '@/components/heading'
import CountdownTimer from '@/app/(site)/(routes)/components/countdown-timer'
import CardImage from '../../../components/card-image'
import DetailsGrid from './details-grid'
import { getCurrentUser } from '@/actions/auth/getCurrentUser'
import EditButton from './edit-button'
import DeleteButton from './delete-button'

interface DetailsPageProps {
  params: {
    id: string
  }
}

export const revalidate = 0

const DetailsPage: React.FC<DetailsPageProps> = async ({ params }) => {
  const details = await getAuctionDetails(params.id)
  const user = await getCurrentUser()

  return (
    <div>
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

        <div className="border-2 rounded-lg p-2 bg-gray-100">
          <Heading title="Bids" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailsGrid auction={details} />
      </div>
    </div>
  )
}

export default DetailsPage
