import type { CollectionConfig } from 'payload/types'

const WebData: CollectionConfig = {
  slug: 'webData',
  hooks: {
    afterChange: [
      ({ doc, operation, req }) => {
        if (operation === 'create') {
          req.payload.sendEmail({
            to: 'hoangtran2k100@gmail.com',
            from: 'hoangtran2k1000@gmail.com',
            subject: 'You have joined our newsletter list!' + doc.title,
            html: '<p>Thanks for signing up</p>' ,
          })
        }
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
  ],
}

export default WebData
