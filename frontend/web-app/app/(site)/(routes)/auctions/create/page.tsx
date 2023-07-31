import Heading from '@/components/heading'
import AuctionForm from '../auction-form'

interface CreatePageProps {}

const CreatePage: React.FC<CreatePageProps> = () => {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Sell your car"
        subtitle="Please enter the details for your car"
      />
      <AuctionForm />
    </div>
  )
}

export default CreatePage
