'use client'

import useAuctionParams from '@/hooks/useAuctionParams'
import { SearchIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent } from 'react'

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { setParams, setSearchValue, searchValue } = useAuctionParams()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const search = () => {
    if (pathname !== '/') router.push('/')
    setParams({ searchTerm: searchValue })
  }

  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') search()
        }}
        value={searchValue}
        onChange={onChange}
        type="text"
        placeholder="Search for cars by make, model or color"
        className="flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:border-transparent focus:ring-0 text-sm text-gray-600"
      />
      <button onClick={search}>
        <SearchIcon
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  )
}

export default Search
