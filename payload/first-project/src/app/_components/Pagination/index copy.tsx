'use client'
import React, { useEffect } from 'react'
import { Chevron } from '../Chevron'
import Link from 'next/link'
import classes from './index.module.scss'
export const PaginationVer2: React.FC<{
  page: number
  totalPages: number
  className?: string
  relationTo?: 'posts' | 'projects' | 'webdata'
  path: string
}> = props => {
  // useEffect(() => {
  //   makeRequest()
  // }, [page])
  const { page, totalPages, className, relationTo, path} = props
  let pageQuery: string = relationTo + 'page'
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1
  
  return (
    <div className={[classes.pagination, className].filter(Boolean).join(' ')}>
      <div className={classes.pageRange}>
        <span className={classes.pageRangeLabel}>
          Page {page} of {totalPages}
        </span>
      </div>
      <Link
        className={classes.button}
        href={{
          pathname: path,
          query: { [pageQuery]: 1 },
        }}
        // onClick={handleLinkClick}
        replace={true}
        aria-disabled={!hasPrevPage}
      >
        <Chevron rotate={90} className={classes.icon} />
      </Link>
      {page < 3 ? (
        <></>
      ) : (
        <>
          {/* <button
            type="button"
            className={classes.button}
            disabled={!hasPrevPage}
            onClick={() => {
              onClick(page - 2)
            }}
          >
            {page - 2}
          </button> */}
          <Link
            className={classes.button}
            href={{
              pathname: path,
              query: { [pageQuery]: page - 2 },
            }}
            // onClick={handleLinkClick}
            replace={true}
            aria-disabled={!hasPrevPage}
          >
            {page - 2}
          </Link>
        </>
      )}
      {page < 2 ? (
        <></>
      ) : (
        <>
          {/* <button
            type="button"
            className={classes.button}
            disabled={!hasPrevPage}
            onClick={() => {
              onClick(page - 1)
            }}
          >
            {page - 1}
          </button> */}
          <Link
            className={classes.button}
            href={{
              pathname: path,
              query: { [pageQuery]: page - 1 },
            }}
            // onClick={handleLinkClick}
            replace={true}
            aria-disabled={!hasPrevPage}
          >
            {page - 1}
          </Link>
        </>
      )}
      <button
        type="button"
        className={classes.button}
        disabled
      >
        {page}
      </button>
      {totalPages - page < 1 ? (
        <></>
      ) : (
        <>
          {/* <button
            type="button"
            className={classes.button}
            disabled={!hasNextPage}
            onClick={() => {
              onClick(page + 1)
            }}
          >
            {page + 1}
          </button> */}
          <Link
            className={classes.button}
            href={{
              pathname: path,
              query: { [pageQuery]: page + 1 },
            }}
            // onClick={handleLinkClick}
            replace={true}
            aria-disabled={!hasNextPage}
          >
            {page + 1}
          </Link>
        </>
      )}
      {totalPages - page < 2 ? (
        <></>
      ) : (
        // <button
        //   type="button"
        //   className={classes.button}
        //   disabled={!hasNextPage}
        //   onClick={() => {
        //     onClick(page + 2)
        //   }}
        // >
        //   {page + 2}
        // </button>
        <>
          <Link
            className={classes.button}
            href={{
              pathname: path,
              query: { [pageQuery]: page + 2 },
            }}
            //onClick={handleLinkClick}
            replace={true}
            aria-disabled={!hasNextPage}
          >
            {page + 2}
          </Link>
        </>
      )}

      {/* <button
        type="button"
        className={classes.button}
        disabled={!hasNextPage}
        onClick={() => {
          onClick(totalPages)
        }}
      >
        <Chevron rotate={-90} className={classes.icon} />
      </button> */}
      <>
        <Link
          className={classes.button}
          prefetch={true}
          href={{
            pathname: path,
            query: { [pageQuery]: totalPages },
          }}
          // onClick={() => {
          //   // Add your function here
          //   // For example:
          //   console.log('Navigating to a different page!');
          //   handleLinkClick();
          // }}
          replace={true}
          aria-disabled={!hasNextPage}
        >        
          <Chevron rotate={-90} className={classes.icon} />
        </Link>
      </>
    </div>
  )
}
