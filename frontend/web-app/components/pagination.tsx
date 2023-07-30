'use client'

import { Pagination as FlowbitePagination } from 'flowbite-react'
import { useState } from 'react'

interface PaginationProps {
  currentPage: number
  pageCount: number
  pageChanged: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  pageChanged,
}) => {
  return (
    <FlowbitePagination
      currentPage={currentPage}
      onPageChange={pageChanged}
      totalPages={pageCount}
      layout="pagination"
      showIcons
      className="mb-5 text-blue-500"
    />
  )
}

export default Pagination
