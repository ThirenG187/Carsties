'use client'

import { getAuctionsResponse } from '@/actions/auctions/getAuctions'
import AuctionCard from './components/auction-card'
import Pagination from '@/components/pagination'
import { Auction, PagedResult } from '@/types'
import { useEffect, useState } from 'react'
import Filters from './components/filters'
import useAuctionParams from '@/hooks/useAuctionParams'
import qs from 'query-string'
import EmptyFilter from '@/components/empty-filter'
import { useAuctionStore } from '@/hooks/useAuctionStore'

export const revalidate = 0

export default function HomePage() {
  const [loading, setLoading] = useState(true)

  const {
    pageNumber,
    pageSize,
    searchTerm,
    setParams,
    orderBy,
    filterBy,
    winner,
    seller,
  } = useAuctionParams()

  const { auctions, totalCount, pageCount, setData } = useAuctionStore()

  // const data = useAuctionStore((state) => ({
  //   auctions: state.auctions,
  //   totalCount: state.totalCount,
  //   pageCount: state.pageCount,
  // }))

  // const setData = useAuctionStore((state) => state.setData)

  const url = qs.stringifyUrl({
    url: '',
    query: {
      pageNumber,
      pageSize,
      searchTerm,
      orderBy,
      filterBy,
      seller,
      winner,
    },
  })

  const setPageNumber = (pageNumber: number) => setParams({ pageNumber })

  useEffect(() => {
    getAuctionsResponse(url).then((response) => {
      setData(response)
      setLoading(false)
    })
  }, [setData, url])

  if (loading) return <h3>Loading...</h3>

  return (
    <>
      <Filters />
      {totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {auctions &&
              auctions.map((auction: any) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
          <div className="flex justify-center">
            <Pagination
              currentPage={pageNumber}
              pageCount={pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  )
}
