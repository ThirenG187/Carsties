'use client'

import { Button } from 'flowbite-react'
import Link from 'next/link'

interface EditButtonProps {
  id: string
}

const EditButton: React.FC<EditButtonProps> = ({ id }) => {
  return (
    <Button>
      <Link href={`/auctions/update/${id}`}>Update Auction</Link>
    </Button>
  )
}

export default EditButton
