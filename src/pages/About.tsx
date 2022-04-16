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
  zIndex: 3,
  background: '#ededef',
}

function About() {
  const match = useMatch('/about')
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
        <FlipAnimation flipId="general" animationType="font">
          <h1 className="title" style={{ fontSize: 18, height: 26, color: '#306ee8' }}>
            General
          </h1>
        </FlipAnimation>

        <div style={{ marginLeft: 20, fontSize: 24, color: '#00000' }}>About</div>
      </header>

      {heights.map((height, i) => {
        return <div key={i} style={{ height }} className="card"></div>
      })}
    </div>
  )
}

export default About
