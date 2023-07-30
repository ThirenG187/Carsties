import useAuctionParams from '@/hooks/useAuctionParams'
import Heading from './Heading'
import { Button } from 'flowbite-react'

interface EmptyFilterProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyFilter: React.FC<EmptyFilterProps> = ({
  title = 'No Matches for this filter',
  subtitle = 'Try changing or resetting the filter',
  showReset,
}) => {
  const { reset } = useAuctionParams()

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button outline onClick={reset}>
            Remove Filters
          </Button>
        )}
      </div>
    </div>
  )
}

export default EmptyFilter
