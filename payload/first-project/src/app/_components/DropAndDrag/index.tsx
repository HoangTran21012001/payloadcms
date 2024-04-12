'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { actionAddAllGlobals, actionDeleteGlobals, actionUpdateGlobals } from '../../_api/actionUpdateGlobals'
import elements from '../../../payload/fields/richText/elements'
interface ListType {
  id: number
  name: string
}

export const Scroll: React.FC<{
  data: any
  block: any
  dataUpdate: any
}> = props => {
  const { data, block, dataUpdate } = props
  const [dataG, SetDataG] = useState(data)
  const [state1, setState1] = useState<ListType[]>(block)
  const [dataB, SetDataB] = useState([])
  const [pos, SetPos] = useState('')
  const [flag, SetFlag] = useState(0)
  const [listblock, SetListblock] = useState([])
  const [listDelete, SetListDelete] = useState<ListType[]>([])
  //console.log('dataB',dataB)
  // console.log(flag)
  const update = async () => {
    //console.log(pos)
    await actionUpdateGlobals(pos.toLowerCase(), dataUpdate[pos].layout, listblock)
  }
  const remove = async () => {
    //console.log(pos)
    await actionDeleteGlobals(pos.toLowerCase(), dataUpdate[pos].layout, listDelete)
  }
  const addAll = async () => {
    //console.log(pos)
    await actionAddAllGlobals(dataG, dataUpdate)
  }
  useEffect(() => {
    if(dataB && dataG[flag].block){
      SetDataG(prevDataG => {
        const updatedDataG = [...prevDataG] // Create a copy of the array
        updatedDataG[flag].block = dataB// Update the specific index with dataB
        updatedDataG[flag].blockAdd = listblock
        return updatedDataG
      })
    }
  },[dataB])
  //console.log(pos)
  //console.log(dataUpdate[pos].layout)
  // console.log(pos)
  // if(pos != ''){
  //   console.log(dataUpdate[pos].layout)
  // }
  // console.log(listblock)
  // console.log('dataB', dataB)
  // console.log('delete',listDelete);
  // console.log('dataG', dataG)
  return (
    <>
      <div className="container" style={{ display: 'flex' }}>
        <div sidebar-left="true" style={{ width: '50%' }}>
          {dataG.map((item, index: number) => (
            <div key={item.lid}>
              <ReactSortable
                list={dataG}
                setList={SetDataG}
                sort={false}
                animation={150}
                group={{ name: 'share', put: false }}
                filter={'.' + item.name}
                onChoose={() => {
                  SetDataB(item.block), SetFlag(index), SetPos(item.name), SetListblock([])
                }}
                onEnd={() => {
                  console.log('end')
                }}
              >
                <div>
                  <h4>{item.name}</h4>
                </div>
              </ReactSortable>
              <ReactSortable
                list={dataB}
                setList={SetDataB}
                sort={false}
                animation={150}
                group={{ name: 'block' }}
                onEnd={() => {
                  // console.log('end')
                }}
                onStart={() => {
                  SetFlag(index), SetPos(item.name), SetListblock([])
                }}
              >
                {flag === index && dataB
                  ? dataB.map((e: { id: number; name: string }) => <p key={e.id}>{e.name}</p>)
                  : item.block.map((e: { id: number; name: string }) => <p key={e.id}>{e.name}</p>)}
              </ReactSortable>
            </div>
          ))}
        </div>
        <div sidebar-right="true" style={{ width: '30%' }}>
          <ReactSortable
            list={state1}
            setList={setState1}
            sort={false}
            animation={150}
            group={{ name: 'block', put: false, pull: 'clone' }}
            // onClone={(clonedItem) => console.log(clonedItem.clone.dataset.id)}
            onStart={element => {
              element.clone.dataset.id = Math.random().toString()
            }}
            onClone={element => {
              listblock.push(element.clone.innerText)
            }}
            clone={originalItem => ({ ...originalItem, id: Math.random() })}

            // onSelect={elements => {
            //   console.log(elements)
            // }}
          >
            {state1.map(item => (
              <p key={item.id}>{item.name} </p>
            ))}
          </ReactSortable>
          <div>---------</div>
          <h4>Block for delete</h4>
          <ReactSortable
            list={listDelete}
            setList={SetListDelete}
            sort={false}
            animation={150}
            group={{ name: 'block' }}
          >
            {listDelete.map(item => (
              <p key={item.id}>{item.name} </p>
            ))}
          </ReactSortable>
        </div>
      </div>
      <button onClick={update}>SAVE</button>
      <button onClick={remove}>DELETE</button>
      <button onClick={addAll}>ADDALL</button>
    </>
  )
}
