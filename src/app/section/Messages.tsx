import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Badge } from '~/components/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import { cn } from '~/lib/utils'

interface Message {
  id: string
  nama: string
  ucapan: string
  isHadir: boolean | null
  createdAt: string
}

interface GuestbookResponse {
  success: boolean
  data: Message[]
  pagination: {
    currentPage: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

const fetchGuestbook = async (page: number): Promise<GuestbookResponse> => {
  const { data } = await axios.get(`/api/guestbook?page=${page}`)
  return data
}

function Messages() {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, error } = useQuery({
    queryKey: ['guestbook', { currentPage }],
    queryFn: () => fetchGuestbook(currentPage),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading messages...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-red-500">Error loading messages</div>
      </div>
    )
  }

  if (!data?.success || !data.data.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg text-gray-500">No messages yet</div>
      </div>
    )
  }

  const { data: messages, pagination } = data

  const renderPaginationItems = () => {
    const items = []
    const { currentPage, totalPages } = pagination

    if (pagination.hasPrevPage) {
      items.push(
        <PaginationItem key="prev">
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(currentPage - 1)
            }}
          />
        </PaginationItem>
      )
    }

    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, currentPage + 2)

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(1)
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      )
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(page)
            }}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(totalPages)
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }


    if (pagination.hasNextPage) {
      items.push(
        <PaginationItem key="next">
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage(currentPage + 1)
            }}
          />
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className='mt-10 px-6 pb-10'>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-noto-serif">Do&apos;a & Ucapan</h1>
      </div>

      <div className="space-y-4 bg-[#f5f3ee] mt-7 px-4 py-6 rounded-4xl">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-transparent border-b-2 pb-2"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[14px] font-nunito">{message.nama}</h3>
                {message.isHadir !== null && (
                  <Badge className={cn(message.isHadir ? "bg-green-500" : "bg-red-500")}>
                    {message.isHadir ? "Hadir" : "Tidak Hadir"}
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed font-poppins text-[14px]">{message.ucapan}</p>
          </div>
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {renderPaginationItems()}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default Messages