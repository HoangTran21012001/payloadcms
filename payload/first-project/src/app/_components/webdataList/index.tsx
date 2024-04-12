import { Pagination } from '../Pagination'

import Link from 'next/link'
import React from 'react'
// type Result = {
//   docs: WebDatum[]
//   hasNextPage: boolean
//   hasPrevPage: boolean
//   nextPage: number
//   page: number
//   prevPage: number
//   totalDocs: number
//   totalPages: number
// }
export const WebdataList: React.FC<{ page: number; resultsData }> = props => {
  const { page, resultsData } = props
  return (
    <React.Fragment>
      <h2>hello {page}</h2>
      <div>
        {resultsData.docs?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index}>
                <h3>{result.url}</h3>
              </div>
            )
          }
          return null
        })}
      </div>
      {resultsData.totalPages > 1 && (
        <Pagination
          page={resultsData.page}
          totalPages={resultsData.totalPages}
          relationTo={'webdata'}
          path={'/webdata'}
        />
      )}
    </React.Fragment>
  )
}
