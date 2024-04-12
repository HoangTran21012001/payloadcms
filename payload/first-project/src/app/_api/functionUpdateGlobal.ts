'use server'
import payload from 'payload'
import { GLOBAL_QUERY } from '../_graphql/globals'
import { GRAPHQL_API_URL } from './shared'

export async function UpdateLayout() {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')
  const alllayout = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GLOBAL_QUERY,
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      return res.data
    })

  return alllayout
}
export async function UpdateLayoutPayload(name, data, block: string[]) {
  //console.log('data', data)
  let dataBlock = []

  const dataContent = {
    blockType: 'content',
    columns: [
      {
        size: 'twoThirds',
        richText: [
          {
            children: [
              {
                text: "This content is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you'd like from rich text and images, to highly designed, complex components.",
              },
            ],
          },
        ],
        link: {
          reference: null,
          url: '',
          label: '',
        },
      },
    ],
  }
  const dataMediablock = {
    blockType: 'mediaBlock',
    blockName: 'Media Block',
    position: 'default',
    media: '65f8f2b45a2d03c257ab9aca',
  }
  const dataArchive = {
    blockName: 'Archive Block',
    blockType: 'archive',
    introContent: [
      {
        type: 'h4',
        children: [
          {
            text: 'Recent projects',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'The projects below are displayed in an "Archive" layout building block which is an extremely powerful way to display documents on a page. It can be auto-populated by collection or by category, or projects can be individually selected. Pagination controls will automatically appear if the number of results exceeds the number of items per page.',
          },
        ],
      },
    ],
    populateBy: 'collection',
    relationTo: 'projects',
    categories: [],
  }
  block.forEach(e => {
    if (e.trim() === 'content') {
      dataBlock.push(dataContent)
    } else if (e.trim() === 'mediaBlock') {
      dataBlock.push(dataMediablock)
    } else if (e.trim() === 'archive') {
      dataBlock.push(dataArchive)
    }
  })
  if (data.length > 0) {
    await payload.updateGlobal({
      slug: name,
      data: {
        layout: data
          .map(e => {
            if (e.blockType.trim() === 'content') {
              return {
                blockType: e.blockType,
                columns: e.columns,
              }
            } else if (e.blockType.trim() === 'archive') {
              return {
                blockType: e.blockType,
                introContent: e.introContent,
              }
            } else if (e.blockType.trim() === 'mediaBlock') {
              return {
                blockType: e.blockType,
                media: e.media.id,
              }
            }
          })
          .filter(Boolean) // Remove any null values
          .concat(dataBlock),
      },
    })
  } else if (dataBlock.length > 0 && data.length == 0) {
    await payload.updateGlobal({
      slug: name,
      data: {
        layout: dataBlock,
      },
    })
  } else {
    await payload.updateGlobal({
      slug: name,
      data: {
        layout: [],
      },
    }).catch(error => {
      console.log(error)
    });


  }
}
export async function UpdateLayoutPayloadFormat(name) {
  await payload.updateGlobal({
    slug: name,
    data: {
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'twoThirds',
              richText: [
                {
                  children: [
                    {
                      text: "This content is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you'd like from rich text and images, to highly designed, complex components.",
                    },
                  ],
                },
              ],
              link: {
                reference: null,
                url: '',
                label: '',
              },
            },
          ],
        },
      ],
    },
  })
}
