'use client'

import { createBidForAuction } from '@/actions/bids/createBidForAuction'
import { useBidStore } from '@/hooks/useBidStore'
import { currencyFormatter } from '@/lib/utils'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

interface BidFormProps {
  auctionId: string
  highBid: number
}

const BidForm: React.FC<BidFormProps> = ({ auctionId, highBid }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { addBid } = useBidStore()

  const onSubmit = (data: FieldValues) => {
    if (data.amount <= highBid) {
      reset()
      return toast.error(
        'Bid must be at least ' + currencyFormatter.format(highBid + 1)
      )
    }
    createBidForAuction(auctionId, Number(data.amount))
      .then((bid) => {
        if (bid.error) throw bid.error

        addBid(bid)
        reset()
      })
      .catch((err) => toast.error(err.message))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        className="input-custom text-sm text-gray-600"
        placeholder={`Enter your bid (minimum bid is ${currencyFormatter.format(
          highBid + 1
        )})`}
        type="number"
        {...register('amount')}
      />
    </form>
  )
}

export default BidForm
