
import { Hero } from '../Hero'
import { Blocks } from '../Blocks'

export function SidebarRight(data) {
  
  const { hero, layout } = data.data

  // console.log(sideLeft)
  return (
    <>
      <Hero {...hero} />
      <Blocks
        blocks={layout}
        disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
        searchParams={''}
      />
    </>
  )
}
