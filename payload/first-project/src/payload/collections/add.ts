import { CollectionConfig } from 'payload/types'
import { hero } from '../fields/hero'
import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { Archive } from '../blocks/ArchiveBlock'
import { Table } from '../blocks/TableBlock'

export const AddForm: CollectionConfig = {
  slug: 'addform',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
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
              required: true,
              blocks: [CallToAction, Content, MediaBlock, Archive, Table],
            },
          ],
        },
      ],
    },
  ],
}
