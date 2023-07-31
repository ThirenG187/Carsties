'use client'

import { deleteAuction } from '@/actions/auctions/deleteAuction'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface DeleteButtonProps {
  id: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onDeleteHandler = () => {
    setIsLoading(true)
    deleteAuction(id)
      .then((res) => {
        if (res.error) throw res.error
        router.push('/')
      })
      .catch((error: any) => {
        toast.error(error.status + ' ' + error.message)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Button isProcessing={isLoading} color="failure" onClick={onDeleteHandler}>
      Delete Auction
    </Button>
  )
}

export default DeleteButton
