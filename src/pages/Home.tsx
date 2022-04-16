import React from 'react'
import { getRandomHeight } from '../utils'
import { useNavigate, useMatch } from 'react-router-dom'
import FlipAnimation from '../components/FlipAnimation'

const heights = Array.from({ length: 5 }, () => getRandomHeight())

const style: React.CSSProperties = { position: 'relative', zIndex: 1, background: '#ededef' }

function Home() {
  const match = useMatch('/')

  const navigate = useNavigate()

  const goForm = () => navigate('/form')

  return (
    <div style={style}>
      <header
        style={{
          visibility: !match ? 'hidden' : 'visible',
        }}
        className="flex px-4 pt-10 pb-4"
      >
        <FlipAnimation flipId="title" animationType="font">
          <h1 className="title" style={{ fontSize: 48, height: 48 }}>
            Settings
          </h1>
        </FlipAnimation>
      </header>
      {heights.map((height, i) => {
        return <div key={i} style={{ height }} className="card" onClick={goForm}></div>
      })}
    </div>
  )
}

export default Home
