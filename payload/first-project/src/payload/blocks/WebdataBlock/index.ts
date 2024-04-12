import type { Block } from 'payload/types'

export const WebdataBlock : Block = {
    slug: "wb",
    labels:{
        singular: "wb block",
        plural:'wb block',
    },
    fields: [
        {
            name: 'Heading',
            label: 'Heading',
            type:'text'
        },
        {
            name:'text',
            label:'Text',
            type:'textarea'
        }

    ]
}