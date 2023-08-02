'use client'

import { useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { useAuctionStore } from '@/hooks/useAuctionStore'
import { useBidStore } from '@/hooks/useBidStore'
import { Auction, AuctionFinished, Bid } from '@/types'
import { User } from 'next-auth'
import { toast } from 'react-hot-toast'
import AuctionCreatedToast from '@/components/auction-created-toast'
import { getAuctionDetails } from '@/actions/auctions/getAuctionDetails'
import AuctionFinishedToast from '@/components/auction-finished-toast'

interface SignalRProviderProps {
  children: React.ReactNode
  user: User | null
}

const SignalRProvider: React.FC<SignalRProviderProps> = ({
  children,
  user,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [connection, setConnection] = useState<HubConnection | null>(null)

  const { setCurrentPrice } = useAuctionStore()
  const { addBid } = useBidStore()
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://api.carsties.com/notifications'
      : process.env.NEXT_PUBLIC_NOTIFY_URL!

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(apiUrl)
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection)
    setIsMounted(true)
  }, [apiUrl])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Connected to notification hub')

          connection.on('BidPlaced', (bid: Bid) => {
            if (bid.bidStatus.includes('Accepted')) {
              setCurrentPrice(bid.auctionId, bid.amount)
            }
            addBid(bid)
          })

          connection.on('AuctionCreated', (auction: Auction) => {
            if (user?.username !== auction.seller) {
              return toast(<AuctionCreatedToast auction={auction} />, {
                duration: 10000,
              })
            }
          })

          connection.on(
            'AuctionFinished',
            (finishedAuction: AuctionFinished) => {
              const auction = getAuctionDetails(finishedAuction.auctionId)
              return toast.promise(
                auction,
                {
                  loading: 'Loading',
                  success: (auction) => (
                    <AuctionFinishedToast
                      finishedAuction={finishedAuction}
                      auction={auction}
                    />
                  ),
                  error: (err) => 'Auction finished',
                },
                { success: { duration: 10000, icon: null } }
              )
            }
          )
        })
        .catch((error) => console.log(error))
    }

    return () => {
      connection?.stop()
    }
  }, [connection, setCurrentPrice, addBid, user?.username])

  if (!isMounted) {
    return null
  }

  return children
}

export default SignalRProvider
