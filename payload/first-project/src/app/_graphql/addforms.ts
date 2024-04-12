import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'

export const ADDFORM = `
Addform  {
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
    ${MEDIA_BLOCK}
    ${ARCHIVE_BLOCK}
  }
}`

export const ADDFORM_QUERY = `
query Sidebarleft {
  ${ADDFORM}
}
`
