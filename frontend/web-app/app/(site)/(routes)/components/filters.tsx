'use client'

import useAuctionParams from '@/hooks/useAuctionParams'
import { Button } from 'flowbite-react'
import { Clock, Flame, SortAsc, StopCircle, ListEnd, Watch } from 'lucide-react'

interface FiltersProps {}

const pageSizeButtons = [4, 8, 12]

const orderButtons = [
  { label: 'Alphabetical', icon: SortAsc, value: 'make' },
  { label: 'End Date', icon: Clock, value: 'endingSoon' },
  { label: 'Recently Added', icon: StopCircle, value: 'new' },
]

const filterButtons = [
  { label: 'Live Auctions', icon: Flame, value: 'live' },
  { label: 'End < 6 hours', icon: ListEnd, value: 'endingSoon' },
  { label: 'Completed', icon: Watch, value: 'finished' },
]

const Filters: React.FC<FiltersProps> = () => {
  const { pageSize, setParams, orderBy, filterBy } = useAuctionParams()

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-x-4 items-center justify-start">
        <span className="uppercase text-sm text-gray-500">Filter by</span>
        <Button.Group>
          {filterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? 'red' : 'gray'}`}
              className="focus:ring-transparent"
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>

      <div className="flex gap-x-4 items-center justify-start">
        <span className="uppercase text-sm text-gray-500">Order by</span>
        <Button.Group>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? 'red' : 'gray'}`}
              className="focus:ring-transparent"
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </Button.Group>
      </div>

      <div className="flex gap-x-4 items-center justify-start">
        <span className="uppercase text-sm text-gray-500">Page Size</span>
        <Button.Group>
          {pageSizeButtons.map((value: number, index: number) => (
            <Button
              key={index}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? 'red' : 'gray'}`}
              className="focus:ring-transparent"
            >
              {value}
            </Button>
          ))}
        </Button.Group>
      </div>
    </div>
  )
}

export default Filters
