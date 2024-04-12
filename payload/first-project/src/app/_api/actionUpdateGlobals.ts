'use server'
import { revalidatePath } from 'next/cache'
import { UpdateLayoutPayload } from './functionUpdateGlobal'
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
export const actionUpdateGlobals = async (name, data, block: string[]) => {
  await UpdateLayoutPayload(name, data, block)
  revalidatePath('/')
}
export const actionDeleteGlobals = async (name, data, listDelete: ListType[]) => {
  // console.log(listDelete)

  listDelete.forEach(element => {
    if ((element.name = data[element.id - 1].blockType)) {
      data.splice(element.id - 1, 1)
      //   console.log(element)
    }
  })
  await UpdateLayoutPayload(name, data, [])
  revalidatePath('/')
}
export const actionDeleteGlobalsOne = async (name, data, listDelete: ListType) => {
  console.log(listDelete)

  console.log('data', data)
    if ((listDelete.name = data[listDelete.id - 1].blockType)) {
      data.splice(listDelete.id - 1, 1)
      //   console.log(element)
    }
  
  await UpdateLayoutPayload(name, data, [])
  revalidatePath('/')
}
export const actionAddAllGlobals = async (dataG: listformat[], data) => {
  dataG.forEach(async element => {
    
    if (data[element.name].layout && element.blockAdd.length > 0) {
    //   console.log('blockadd', element.blockAdd)
    //   console.log('data', data[element.name].layout)
    await UpdateLayoutPayload(element.name.toLowerCase(),  data[element.name].layout, element.blockAdd)
    }
  })
  revalidatePath('/')
}
