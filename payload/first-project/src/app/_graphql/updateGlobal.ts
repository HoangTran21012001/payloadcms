
import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'

export const Mutation_query = `
query Header {
    mutation UpdateSidebarleft {
        updateSidebarleft(data: ) {
            title
            layout
            updatedAt
            createdAt
        }
    }
}
`