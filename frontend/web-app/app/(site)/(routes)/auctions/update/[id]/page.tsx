import Heading from '@/components/heading'
import AuctionForm from '../../auction-form'
import { getAuctionDetails } from '@/actions/auctions/getAuctionDetails'

interface UpdatePageProps {
  params: {
    id: string
  }
}

export const revalidate = 0
export const dynamic = 'force-dynamic'

const UpdatePage: React.FC<UpdatePageProps> = async ({ params }) => {
  const auctionData = await getAuctionDetails(params.id)

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update the details of your car"
      />
      <AuctionForm auction={auctionData} />
    </div>
  )
}

export default UpdatePage
