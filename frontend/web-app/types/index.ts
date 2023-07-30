export type PagedResult<T> = {
  results: T[]
  pageCount: number
  totalCount: number
}

export type Auction = {
  reservePrice: number
  seller: string
  winner?: string
  soldAmount: number
  currentHighBid: number
  status: string
  createdAt: string
  updatedAt: string
  auctionEnd: string
  make: string
  model: string
  year: number
  color: string
  mileage: number
  imageUrl: string
  id: string
}
