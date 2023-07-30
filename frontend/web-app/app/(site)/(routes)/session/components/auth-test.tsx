'use client'

import { updateAuctionTest } from '@/actions/auctions/updateAuctionTest'
import { Button } from 'flowbite-react'
import { useState } from 'react'

interface AuthTestProps {}

const AuthTest: React.FC<AuthTestProps> = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>()

  const doUpdate = () => {
    setResult(undefined)
    setLoading(true)
    updateAuctionTest()
      .then((res) => setResult(res))
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex items-center gap-4">
      <Button outline isProcessing={loading} onClick={doUpdate}>
        Test Auth
      </Button>
      <div className="">{JSON.stringify(result, null, 2)}</div>
    </div>
  )
}

export default AuthTest
