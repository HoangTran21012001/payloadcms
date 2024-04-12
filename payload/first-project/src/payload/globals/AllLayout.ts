import { GlobalConfig } from 'payload/types'
import { hero } from '../fields/hero'
import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { Archive } from '../blocks/ArchiveBlock'
import { Table } from '../blocks/TableBlock'

export const AllLayout: GlobalConfig = {
  slug: 'alllayout',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heading',
      type: 'group',
      interfaceName: 'meta',
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
    },
    {
      name: 'sidbarleft',
      type: 'group',
      interfaceName: 'meta',
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
    },
    {
      name: 'sidebarright',
      type: 'group',
      interfaceName: 'meta',
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
    },
  ],
}
