import axios, { AxiosError } from 'axios'
async function fetchPage(url: string) {
  try {
    const res = await axios.get(url)
    const jsdom = require('jsdom')
    const { JSDOM } = jsdom
    const virtualConsole = new jsdom.VirtualConsole()
    virtualConsole.on('error', () => {
      // No-op to skip console errors.
    })
    const dom = new JSDOM(res.data, { virtualConsole })

    const links: { title: string; url: string }[] = []

    dom.window.document
      .querySelectorAll('a')
      .forEach((link: { getAttribute: (arg0: string) => any; text: string }) => {
        const href = link.getAttribute('href')
        const text = link.text.trim()
        if (href && text) {       
           links.push({ title: text, url: href });
        }
      })

    return links
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error(axiosError.toJSON())
    } else {
      console.error(error)
    }
    return null
  }
}

export default fetchPage
