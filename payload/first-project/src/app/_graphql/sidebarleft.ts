import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'

export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
        slug
      }
    }
  }
`

export const SIDEBARLEFT = `
  query Page() {
    
      docs {
        id
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    
  }
`
