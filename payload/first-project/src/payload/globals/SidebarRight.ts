import { GlobalConfig } from 'payload/types'
import { hero } from '../fields/hero'
import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { Archive } from '../blocks/ArchiveBlock'
import { Table } from '../blocks/TableBlock'

export const SidebarRight: GlobalConfig = {
  slug: 'sidebarright',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: false,
              blocks: [CallToAction, Content, MediaBlock, Archive, Table],
            },
          ],
        },
      ],
    },
  ],
}
