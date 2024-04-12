
import { WebdataList } from '../../_components/webdataList'
import { fetchWebata } from '../../_api/fetchWebdata'
import { SidebarLeft } from '../../_components/SidebarLeft'
import { SidebarRight } from '../../_components/SidebarRight'
import { HeadingFrom } from '../../_components/Heading'
import { fetchAllLayout, fetchGlobals } from '../../_api/fetchGlobals'

export default async function Webdata({ searchParams }: any) {
  let page = searchParams.webdatapage
  if (page == null) {
    page = '1'
  }

  let result
  try {
    result = await fetchWebata(page)
  } catch (error) {
    console.error(error)
  }

  console.log(global);
   
  return (
    <>
      <div className="container" style={{ display: 'flex' }}>
        <div sidebar-left="true" style={{ width: '30%' }}>
          {/* <SidebarLeft data={global} /> */}
        </div>
        <div style={{ width: '50%' }}>
          <div className="heading-news">
            {/* <HeadingFrom data={global}/> */}
          </div>
          <WebdataList page={Number(page)} resultsData={result}></WebdataList>
        </div>
        <div sidebar-right="true" style={{ width: '30%' }}>
          {/* <SidebarRight data={global}/> */}
        </div>
      </div>
    </>
  )
}
// async function getData() {
//   try {
//     const global = await fetchAllLayout()
//     return global
//   } catch (error) {
//     console.error(error)
//   }
// }

