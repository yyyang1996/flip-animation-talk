import React, { useLayoutEffect } from 'react'
import { useNavigate, useMatch } from 'react-router-dom'
import IconLucideChevronLeft from '~icons/lucide/chevron-left'
import { getRandomHeight } from '../utils'
import FlipAnimation from '../components/FlipAnimation'

const heights = Array.from({ length: 10 }, () => getRandomHeight())

const style: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 2,
  background: '#ededef',
}

function Form() {
  const match = useMatch('/form')
  const navigate = useNavigate()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={style}>
      <header
        style={{ visibility: !match ? 'hidden' : 'visible' }}
        className="flex py-4 px-4 items-center"
      >
        <div className="flex h-12 w-12 justify-center items-center" onClick={() => navigate(-1)}>
          <IconLucideChevronLeft className=" text-[32px]" />
        </div>
        <FlipAnimation flipId="title" animationType="font">
          <h1 className="title" style={{ fontSize: 18, height: 26, color: '#306ee8' }}>
            Settings
          </h1>
        </FlipAnimation>
      </header>

      {heights.map((height, i) => {
        return <div key={i} style={{ height }} className="card"></div>
      })}
    </div>
  )
}

export default Form
