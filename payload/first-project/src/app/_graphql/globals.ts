import { SidebarLeft } from '../_components/SidebarLeft'
import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'

export const HEADER = `
  Header {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const HEADER_QUERY = `
query Header {
  ${HEADER}
}
`

export const FOOTER = `
  Footer {
    navItems {
      link ${LINK_FIELDS({ disableAppearance: true })}
		}
  }
`

export const FOOTER_QUERY = `
query Footer {
  ${FOOTER}
}
`
export const SIDEBARLEFT = `
Sidebarleft {
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

export const SIDEBARLEFT_QUERY = `
query Sidebarleft {
  ${SIDEBARLEFT}
}
`
export const SIDEBARRIGHT = `
Sidebarright {
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
export const SIDEBARRIGHT_QUERY = `
query Sidebarright{
  ${SIDEBARRIGHT}
}
`
export const HEADING = `
Heading {
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

export const HEADING_QUERY = `
query Heading {
  ${HEADING}
}`

export const SETTINGS = `
  Settings {
    postsPage {
      slug
    }
    projectsPage {
      slug
    }
  }
`

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`
export const ALLLAYOUT = `
  Alllayout {
    heading {
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
    },
    sidbarleft {
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
    },
    sidebarright {
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
    }
  }
`
export const ALLLAYOUT_QUERY = `
  query AllLayout {
    AllLayout {
      ...on AllLayout {
      }
    }
  }
`
export const GLOBAL_QUERY = `
  query Globals {
    ${HEADER}
    ${FOOTER}
    ${SETTINGS}
    ${HEADING}
    ${SIDEBARLEFT}
    ${SIDEBARRIGHT}
  }
`

export const GLOBAL_QUERY_test = `
  query Globals {
    ${HEADING}
    ${SIDEBARLEFT}
    ${SIDEBARRIGHT}
  }
`
