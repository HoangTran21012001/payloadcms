import { text } from 'stream/consumers';

import type { Post } from '../payload-types'

export const post4: Partial<Post> = {
  title: '{{TITLE}}',
  slug: '{{TITLE}}',
  _status: 'published',
  meta: {
    title: '{{TITLE}}',
    description: 'This is data.',
    image: '{{IMAGE}}',
  },
  authors: ['65f3c420edfa8bfc1daeecac'],
  
  hero: {
    type: 'lowImpact',
    links: null,
    richText: [
      {
        children: [
          {
            text: '{{TITLE}}',
          },
        ],
        type: 'h1',
      },
    ],
    media: null,
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: [
            {
              children: [
                {text: ''}
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
  enablePremiumContent: true,
  premiumContent: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: [
            {
              children: [
                {
                  text: 'This is premium content.',
                  bold: true,
                },
                {
                  text: ' It is only available to authenticated users. This content can be anything from additional video, text, and content, to download links and more. These are simply layout building blocks configured in the CMS.',
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
  relatedPosts: [],
}
