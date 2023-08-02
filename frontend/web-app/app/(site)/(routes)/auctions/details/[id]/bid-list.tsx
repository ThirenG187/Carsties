'use client'

import { getBidsForAuction } from '@/actions/bids/getBidsForAuction'
import Heading from '@/components/heading'
import { useBidStore } from '@/hooks/useBidStore'
import { Auction, Bid } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import BidItem from './bid-item'
import { User } from 'next-auth'
import { currencyFormatter } from '@/lib/utils'
import EmptyFilter from '@/components/empty-filter'
import BidForm from './bid-form'

interface BidListProps {
  user: User | null
  auction: Auction
}

const BidList: React.FC<BidListProps> = ({ auction, user }) => {
  const [loading, setLoading] = useState(true)
  const { bids, setBids } = useBidStore()
  const { open, setOpen } = useBidStore()

  const openForBids = new Date(auction.auctionEnd) > new Date()

  const highBid = bids.reduce(
    (prev, current) =>
      prev > current.amount
        ? prev
        : current.bidStatus.includes('Accepted')
        ? current.amount
        : prev,
    0
  )

  useEffect(() => {
    getBidsForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error
        }
        setBids(res as Bid[])
      })
      .catch((err) => {
        toast.error(err.message)
      })
      .finally(() => setLoading(false))
  }, [auction.id, setLoading, setBids])

  useEffect(() => {
    setOpen(openForBids)
  }, [openForBids, setOpen])

  if (loading) return <span>Loading bids...</span>

  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading
            title={`Current high bid is ${currencyFormatter.format(highBid)}`}
          />
        </div>
      </div>

      <div className="overflow-auto h-[400px] flex flex-col-reverse px-2">
        {bids.length === 0 ? (
          <EmptyFilter
            title="No bids for this item"
            subtitle="Please feel free to make a bid"
          />
        ) : (
          <>
            {bids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>
      <div className="px-2 pb-2 text-gray-500">
        {!open ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            This auction has finished.
          </div>
        ) : !user ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            Please log in to make a bid.
          </div>
        ) : user && user.username === auction.seller ? (
          <div className="flex items-center justify-center p-2 text-lg font-semibold">
            You cannot bid on your own auction.
          </div>
        ) : (
          <BidForm auctionId={auction.id} highBid={highBid} />
        )}
      </div>
    </div>
  )
}

export default BidList
