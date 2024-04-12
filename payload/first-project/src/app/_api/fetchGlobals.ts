
import type { Alllayout, Footer, Header, Heading, Settings, Sidebarleft, Sidebarright } from '../../payload/payload-types'
import { ALLLAYOUT_QUERY, FOOTER_QUERY, GLOBAL_QUERY, GLOBAL_QUERY_test, HEADER_QUERY, HEADING_QUERY, SETTINGS_QUERY, SIDEBARLEFT_QUERY, SIDEBARRIGHT_QUERY } from '../_graphql/globals'
import { GRAPHQL_API_URL } from './shared'

export async function fetchSettings(): Promise<Settings> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const settings = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: SETTINGS_QUERY,
    }),
  })
    ?.then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching settings')
      return res.data?.Settings
    })

  return settings
}

export async function fetchHeader(): Promise<Header> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const header = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: HEADER_QUERY,
    }),
  })
    ?.then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching header')
      return res.data?.Header
    })
  
  return header
}

export async function fetchFooter(): Promise<Footer> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const footer = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: FOOTER_QUERY,
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      return res.data?.Footer
    })

  return footer
}
export async function fetchSideBarLeft(): Promise<Sidebarleft> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')

  const sidebarleft = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SIDEBARLEFT_QUERY,
    }),

  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      // console.log(res.data);
      return res.data?.Sidebarleft
    })

  return sidebarleft
}
export async function fetchHeading(): Promise<Heading> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')
  const heading = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: HEADING_QUERY,
    }),
  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      // console.log(res.data);
      return res.data?.Heading
    })

  return heading
}
export async function fetchSideBarRight(): Promise<Sidebarright> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')
  const sidebarright = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: SIDEBARRIGHT_QUERY,
    }),

  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      // console.log(res.data);
      return res.data?.Sidebarright
    })

  return sidebarright
}
export async function fetchTest() {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')
  const alllayout = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GLOBAL_QUERY,
    }),
    cache: 'no-store',
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
export async function fetchTest1() {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')
  const alllayout = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GLOBAL_QUERY_test,
    }),
    cache: 'no-store',
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
export const fetchGlobals = async (): Promise<{
  settings: Settings
  header: Header
  footer: Footer
  heading: Heading
  sidebarleft : Sidebarleft
  sidebarRight : Sidebarright
}> => {
  // initiate requests in parallel, then wait for them to resolve
  // this will eagerly start to the fetch requests at the same time
  // see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
  const settingsData = fetchSettings()
  const headerData = fetchHeader()
  const footerData = fetchFooter()
  const headingData = fetchHeading()
  const sidebarleftData = fetchSideBarLeft()
  const sidebarRightData = fetchSideBarRight()
  const [settings, header, footer, heading, sidebarleft, sidebarRight] : [Settings, Header, Footer, Heading, Sidebarleft, Sidebarright] = await Promise.all([
    await settingsData,
    await headerData,
    await footerData,
    await headingData,
    await sidebarleftData,
    await sidebarRightData,
  ])

  return {
    settings,
    header,
    footer,
    heading,
    sidebarleft,
    sidebarRight
  }
}
export async function fetchAllLayout(): Promise<Alllayout> {
  if (!GRAPHQL_API_URL) throw new Error('NEXT_PUBLIC_SERVER_URL not found')
  const alllayout = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ALLLAYOUT_QUERY,
    }),
    cache:'force-cache'
  })
    .then(res => {
      if (!res.ok) throw new Error('Error fetching doc')
      return res.json()
    })
    ?.then(res => {
      if (res?.errors) throw new Error(res?.errors[0]?.message || 'Error fetching footer')
      // console.log(res.data);
      return res.data?.Alllayout
    })

  return alllayout
}


