import React from 'react'

import { Hero } from '../Hero'
import { Blocks } from '../Blocks'

export function HeadingFrom(data) {
  const { hero, layout } = data.data
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
