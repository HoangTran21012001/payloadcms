import qs from 'qs'
import { WebDatum } from '../../payload/payload-types'
type Result = {
  docs: WebDatum[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}
export const fetchWebata = async (page: number) => {
  try {
    const searchQuery = qs.stringify(
      {
        depth: 1,
        limit: 10,
        page,
      },
      { encode: false },
    )
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/webdata?${searchQuery}`)
    const json = await req.json()
    let result: Result = {
      docs: json.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title || null,
        url: doc.url || null,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      })),
      hasNextPage: json.hasNextPage,
      hasPrevPage: json.hasPrevPage,
      nextPage: json.nextPage,
      page: json.page,
      prevPage: json.prevPage,
      totalDocs: json.totalDocs,
      totalPages: json.totalPages,
    }
    return result
  } catch (err) {
    console.warn(err) // eslint-disable-line no-console
  }
}
