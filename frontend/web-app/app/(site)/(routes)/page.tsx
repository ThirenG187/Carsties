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

export const revalidate = 0

export default function HomePage() {
  const [data, setData] = useState<PagedResult<Auction>>()
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
    })
  }, [url])

  if (!data) return <h3>Loading...</h3>

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.results &&
              data.results.map((auction: any) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
          <div className="flex justify-center">
            <Pagination
              currentPage={pageNumber}
              pageCount={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </>
      )}
    </>
  )
}
