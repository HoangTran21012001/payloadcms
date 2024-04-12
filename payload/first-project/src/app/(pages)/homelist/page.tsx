import React from 'react'
import { fetchTest } from '../../_api/fetchGlobals'
import { Scroll } from '../../_components/DropAndDrag'
import { CallToAction } from '../../../payload/blocks/CallToAction'
import { Content } from '../../../payload/blocks/Content'
import { Media } from '../../../payload/collections/Media'
import { Archive } from '../../../payload/blocks/ArchiveBlock'
import { AddLayout } from '../../_components/AddLayout'
import { UpdateLayoutPayload, UpdateLayoutPayloadFormat } from '../../_api/functionUpdateGlobal'
import { getMeUser } from '../../_utilities/getMeUser'
interface ListType {
  id: number
  name: string
}
interface listformat {
  lid: number
  name: string
  block: ListType[]
  blockAdd: string[]
}
const blockComponents = {
  cta: CallToAction,
  content: Content,
  mediaBlock: Media,
  archive: Archive,
}
function processLayout(key, data) {
  let dataTest = new Array<listformat>()
  key.map((i: { name: string }, index: number) => {
    let dataOne = { lid: 0, name: '', block: [], blockAdd: [] }
    const name = i.name
    const get = data[name]
    dataOne.lid = index + 1
    dataOne.name = i.name
    if (get.layout) {
      get.layout.forEach((element: { blockType: string }, index: number) => {
        dataOne.block.push({ id: index + 1, name: element.blockType })
      })
    }
    dataTest.push(dataOne)
  })
  return dataTest
}
// function updateTest (data){
//   UpdateLayoutPayload("sidebarright", data);
// }
export default async function homelist() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your account.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })
  let test: any
  let key = new Array<ListType>()
  let block = new Array<ListType>()
  let i = 1
  let isAmdin = false

  try {
    test = await fetchTest()
  } catch (error) {
    console.error(error)
  }
  Object.keys(test).forEach(e => {
    key.push({ id: i, name: e })
    i++
  })
  Object.keys(blockComponents).forEach(e => {
    block.push({ id: i, name: e })
    i++
  })
  // UpdateLayoutPayloadFormat("sidebarright");
  // console.log(key)
  //console.log('dataTest', test.Sidebarright.layout);
  // UpdateLayoutPayload("heading", test.Heading.layout, ["content", "media"]);
  if (user.roles) {
    user.roles.forEach(e => {
      if (e == 'admin') {
        isAmdin = true
      }
    })
  }
  const dataTest = processLayout(key, test)
  return (
    <>
      {/* <Scroll data={dataTest} block={block} dataUpdate={test}></Scroll> */}
      <AddLayout data={dataTest} block={block} dataUpdate={test} user={isAmdin}></AddLayout>
    </>
  )
}
