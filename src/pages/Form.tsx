import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconLucideChevronLeft from '~icons/lucide/chevron-left'
import { getRandomHeight } from '../utils'
import FlipAnimation from '../components/FlipAnimation'

const heights = Array.from({ length: 5 }, () => getRandomHeight())

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
  const navigate = useNavigate()

  return (
    <div style={style}>
      <header className="flex py-4 px-4 items-center">
        <div className="flex h-12 w-12 justify-center items-center" onClick={() => navigate(-1)}>
          <IconLucideChevronLeft className=" text-[32px]" />
        </div>
        <FlipAnimation flipId="title">
          <h1 className="title" style={{ fontSize: 18 }}>
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
