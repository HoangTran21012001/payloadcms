import { post4 } from './../../payload/seed/post-4'
import axios from 'axios'
import { downloadImage } from './downloadPhoto'
import payload from 'payload'
import path from 'path'

async function fetchPage2(links: { title: string; url: string }[]) {
  for (const link of links) {
    try {
      const res = await axios.get(link.url)
      const jsdom = require('jsdom')
      const { JSDOM } = jsdom
      const virtualConsole = new jsdom.VirtualConsole()
      virtualConsole.on('error', () => {
        // No-op to skip console errors.
      })
      const dom = new JSDOM(res.data, { virtualConsole })

      const paragraphs = dom.window.document.querySelectorAll('p')
      //let finalText: string = ''
      // paragraphs.forEach((paragraph: Element) => {
      //   const text = paragraph.textContent?.trim()
      //   if (text) {
      //     finalText = finalText.concat(text)
      //   }
      // })
      let name = ''
      const firstPicture = dom.window.document.querySelectorAll('img[itemprop="contentUrl"]')
      firstPicture.forEach((paragraph: Element) => {
        const src = paragraph.getAttribute('data-src')
        if (src) {
          const filename = new URL(src).pathname.split('/').pop()
          downloadImage(src, filename)
          name = filename
        }
      })
      // const mediaDir = path.resolve(__dirname, '../../../../../media')
      // if (fs.existsSync(mediaDir)) {
      //   fs.rmdirSync(mediaDir, { recursive: true })
      // }
      // console.log('media', mediaDir);
     

      const imagedoc = await payload.create({
        collection: 'media',
        filePath: path.resolve(__dirname, '../../../../../media/' + name),
        data: {
          alt: 'Shirts',
          caption: [
            {
              children: [
                {
                  text: 'Photo by ',
                },
                {
                  type: 'link',
                  linkType: 'custom',
                  url: '',
                  newTab: true,
                  children: [
                    {
                      text: 'Voicu Apostol',
                    },
                  ],
                },
                {
                  text: ' on ',
                },
              ],
            },
          ],
        },
      })

      const modifiedPost4 = {
        ...post4,
        categories: ['65f3c421edfa8bfc1daeecb9'],
        title: post4.title.replace(/\{\{TITLE\}\}/g, link.title),
        slug: post4.slug.replace(/\{\{TITLE\}\}/g, link.title),
        meta: {
          title: link.title,
          image: imagedoc.id,
        },
        hero: {
          ...post4.hero,
          richText: post4.hero.richText.map((richText: any) => ({
            ...richText,
            children: richText.children.map((child: any) => ({
              ...child,
              text: child.text.replace(/\{\{TITLE\}\}/g, link.title),
            })),
          })),
        },
        layout: [
          {
            blockType: 'content',
            columns: [
              {
                size: 'twoThirds',
                richText: Array.from(paragraphs).map((element: any) => ({
                  children: [
                    {
                      text: element.textContent?.trim(),
                    },
                  ],
                })),
                link: {
                  reference: null,
                  url: '',
                  label: '',
                },
              },
            ],
          },
        ],
      }

      const post4doc = await payload.create({
        collection: 'posts',
        data: JSON.parse(JSON.stringify(modifiedPost4)),
      })
    } catch (error) {
      continue
    }
  }
}

export default fetchPage2
