'use client'

import { createAuction } from '@/actions/auctions/createAuction'
import { updateAuction } from '@/actions/auctions/updateAuction'
import DateInput from '@/components/date-input'
import Input from '@/components/input'
import { Auction } from '@/types'
import { Button, TextInput } from 'flowbite-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

interface AuctionFormProps {
  auction?: Auction
}

const AuctionForm: React.FC<AuctionFormProps> = ({ auction }) => {
  const router = useRouter()
  const pathname = usePathname()

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({
    mode: 'onTouched',
  })

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction
      reset({ make, model, color, mileage, year })
    }
    setFocus('make')
  }, [setFocus, auction, reset])

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = ''
      let res

      if (pathname === '/auction/create') {
        res = await createAuction(data)
        id = res.id
      } else {
        if (auction) {
          res = await updateAuction(auction.id, data)
          id = auction.id
        }
      }

      if (res.error) {
        throw res.error
      }
      router.push(`/auctions/details/${id}`)
    } catch (error: any) {
      console.log(error.status + ' ' + error.message)
      toast.error(error.status + ' ' + error.message)
    }
  }

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: 'Make is required' }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: 'Model is required' }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: 'Color is required' }}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{ required: 'Year is required' }}
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          rules={{ required: 'Mileage is required' }}
        />
      </div>
      {pathname === '/auctions/create' && (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: 'Image URL is required' }}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: 'Reserve Price is required' }}
            />
            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              control={control}
              dateFormat="dd MMMM yyyy h:mm a"
              showTimeSelect
              rules={{ required: 'Auction End Date is required' }}
            />
          </div>{' '}
        </>
      )}
      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button
          outline
          color="success"
          isProcessing={isSubmitting}
          type="submit"
          disabled={!isValid}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default AuctionForm
