'use client'
import React, { useEffect, useState } from 'react'
import Popover from '@mui/material/Popover'
import { actionAddAllGlobals, actionDeleteGlobalsOne } from '../../_api/actionUpdateGlobals'
interface ListType {
  id: number
  name: string
}
export const AddLayout: React.FC<{
  data: any
  block: any
  dataUpdate: any
  user: any
}> = ({ data, block, dataUpdate, user }) => {
  const [dataG, SetDataG] = useState(data)
  const [dataB, SetDataB] = useState([])
  const [dataBlock] = useState(block)
  const [flag, Setflags] = useState(0)
  const [listblock] = useState([])
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const edit = (a: string) => {
    dataG.map(e => {
      if (e.name === a) {
        Setflags(e.lid - 1)
        SetDataB(e.block)
      }
    })
  }
  const addAll = async () => {
    await actionAddAllGlobals(dataG, dataUpdate)
  }
  const remove = async (name: string, de) => {
    dataG.forEach(element => {
      if (element.name == name) {
        Setflags(element.lid - 1)
        SetDataB(element.block)
      }
    })
    var result = confirm('Want to delete?')
    if (result) {
      SetDataB(datab => {
        const updatedDataG = [...datab] 
        updatedDataG.splice(de.id - 1, 1)
        
        return updatedDataG
      })
      await actionDeleteGlobalsOne(name.toLowerCase(), dataUpdate[name].layout, de)
      // console.log(dataB)
    }
  }
  
  useEffect(() => {
    if (dataB && dataG[flag].block) {
      SetDataG(prevDataG => {
        const updatedDataG = [...prevDataG] // Create a copy of the array
        updatedDataG[flag].block = dataB // Update the specific index with dataB
        updatedDataG[flag].blockAdd = listblock
        return updatedDataG
      })
    }
  }, [dataB])
  // console.log('dataG', dataG)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <>
      <div className="container" style={{ display: 'flex' }}>
        <div sidebar-left="true" style={{ width: '20%', border: 'ridge' }}>
          {dataG.map(elements =>
            elements.name === 'Sidebarleft'
              ? elements.block.map(e => (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                      <p key={e.id} style={{ border: 'solid', width: '100px' }}>
                        {e.name}
                      </p>
                      {user ? (
                        <button
                          onClick={() => {
                            remove('Sidebarleft', e)
                          }}
                        >
                          -
                        </button>
                      ) : (
                        []
                      )}
                    </div>
                  </>
                ))
              : null,
          )}
          <p>left</p>
          <button
            onClick={e => {
              handleClick(e)
              edit('Sidebarleft')
            }}
          >
            add
          </button>
        </div>
        <div style={{ width: '60%', border: 'ridge' }}>
          <div className="heading-news" style={{ border: 'ridge' }}>
            {dataG.map(elements =>
              elements.name === 'Heading'
                ? elements.block.map(e => (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                        <p key={e.id} style={{ border: 'solid', width: '100px' }}>
                          {e.name}
                        </p>
                        {user ? (
                          <button
                            onClick={() => {
                              remove('Heading', e)
                            }}
                          >
                            -
                          </button>
                        ) : (
                          []
                        )}
                      </div>
                    </>
                  ))
                : null,
            )}
            <p>head</p>
            <button
              onClick={e => {
                handleClick(e)
                edit('Heading')
              }}
            >
              add
            </button>
          </div>
          <div style={{ border: 'ridge' }}>
            <p>content</p>
            {/* <button onClick={handleClick} >add</button> */}
          </div>
        </div>
        <div sidebar-right="true" style={{ width: '20%', border: 'ridge' }}>
          {dataG.map(elements =>
            elements.name === 'Sidebarright'
              ? elements.block.map(e => (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                      <p key={e.id} style={{ border: 'solid', width: '100px' }}>
                        {e.name}
                      </p>
                      {user ? (
                        <button
                          onClick={() => {
                            remove('Sidebarright', e)
                          }}
                        >
                          -
                        </button>
                      ) : (
                        []
                      )}
                    </div>
                  </>
                ))
              : null,
          )}
          <p>right</p>
          <button
            onClick={e => {
              handleClick(e)
              edit('Sidebarright')
            }}
          >
            add
          </button>
        </div>
      </div>
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {dataBlock.map((e: any) => (
            <div key={e.id}>
              <p>{e.name}</p>
              <button
                onClick={() => {
                  listblock.push(e.name)
                  dataB.push({id: dataB.length + 1 , name : e.name})
                }}
              >
                +
              </button>
            </div>
          ))}
        </Popover>
      </div>
      {user ? <button onClick={addAll}>ADDALL</button> : []}
    </>
  )
}
