'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import type { Post, Project } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock/types'
import { Card } from '../Card'
import { Gutter } from '../Gutter'
import { PageRange } from '../PageRange'
import { Pagination } from '../Pagination'
import { usePathname } from 'next/navigation'
import classes from './index.module.scss'


type Result = {
  docs: (Post | Project | string)[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

export type Props = {
  categories?: ArchiveBlockProps['categories']
  className?: string
  limit?: number
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  populateBy?: 'collection' | 'selection'
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  relationTo?: 'posts' | 'projects'
  selectedDocs?: ArchiveBlockProps['selectedDocs']
  showPageRange?: boolean
  sort?: string
  searchParams
}

export const CollectionArchive: React.FC<Props> = props => {
  const {
    categories: catsFromProps,
    className,
    limit = 10,
    onResultChange,
    populateBy,
    populatedDocs,
    populatedDocsTotal,
    relationTo,
    selectedDocs,
    showPageRange,
    sort = '-createdAt',
    searchParams,
  } = props
  const query = relationTo +'page';
  let page1 = searchParams[query]
  if (page1 == null) {
    page1 = '1'
  }
  let timer: NodeJS.Timeout = null
  const path = usePathname()

  const [results, setResults] = useState<Result>({
    docs: (populateBy === 'collection'
      ? populatedDocs
      : populateBy === 'selection'
      ? selectedDocs
      : []
    )?.map(doc => doc.value),
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 1,
    page: 1,
    prevPage: 1,
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    totalPages: 1,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const isRequesting = useRef(false)
  const [page, setPage] = useState(Number(page1))

  const categories = (catsFromProps || [])
    .map(cat => (typeof cat === 'object' ? cat.id : cat))
    .join(',')

  // const scrollToRef = useCallback(() => {
  //   const { current } = scrollRef
  //   if (current) {
  //     current.scrollIntoView({
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!isLoading && typeof results.page !== 'undefined') {
  //    scrollToRef()
  //   }
  // }, [isLoading, scrollToRef, results])
  const makeRequest = async () => {
    try {
      const searchQuery = qs.stringify(
        {
          depth: 1,
          limit,
          page,
          sort,
          where: {
            ...(categories
              ? {
                  categories: {
                    in: categories,
                  },
                }
              : {}),
          },
        },
        { encode: false },
      )
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
      )

      const json = await req.json()
      clearTimeout(timer)

      const { docs } = json as { docs: (Post | Project)[] }
      console.log('data' + relationTo, json)
      if (docs && Array.isArray(docs)) {
        setResults(json)

        // setIsLoading(false)
        if (typeof onResultChange === 'function') {
          onResultChange(json)
        }
      }
    } catch (err) {
      console.warn(err) // eslint-disable-line no-console
      // setIsLoading(false)
      setError(`Unable to load "${relationTo} archive" data at this time.`)
    }

    isRequesting.current = false
    hasHydrated.current = true
  }

  useEffect(() => {
    if (populateBy === 'collection') {
      void makeRequest()
    }
  }, [page ,categories , relationTo, onResultChange, sort, limit, populateBy])
  useEffect(() => {
    setPage(Number(page1))
  }, [page1])
  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div className={classes.scrollRef} ref={scrollRef} />
      {!isLoading && error && <Gutter>{error}</Gutter>}
      <Fragment>
        {showPageRange !== false && populateBy !== 'selection' && (
          <Gutter>
            <div className={classes.pageRange}>
              <PageRange
                collection={relationTo}
                currentPage={results.page}
                limit={limit}
                totalDocs={results.totalDocs}
              />
            </div>
          </Gutter>
        )}
        <Gutter>
          <div className={classes.grid}>
            {results.docs?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <div className={classes.column} key={index}>
                    <Card doc={result} relationTo={relationTo} showCategories />
                  </div>
                )
              }

              return null
            })}
          </div>
          {results.totalPages > 1 && populateBy !== 'selection' && (
            <Pagination
              className={classes.pagination}
              page={results.page}
              totalPages={results.totalPages}
              relationTo={relationTo}
              path={path}
            />
          )}
        </Gutter>
      </Fragment>
    </div>
  )
}
