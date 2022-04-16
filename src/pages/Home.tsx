import React from 'react'
import { getRandomHeight } from '../utils'
import { useNavigate } from 'react-router-dom'

const heights = Array.from({ length: 5 }, () => getRandomHeight())

const style: React.CSSProperties = { position: 'relative', zIndex: 1, background: '#ededef' }

function Home() {
  const navigate = useNavigate()

  const goForm = () => navigate('/form')

  return (
    <div style={style}>
      <header className="h-[100px] px-4 pt-10">
        <h1 className="title" style={{ fontSize: 48 }}>
          Settings
        </h1>
      </header>
      {heights.map((height, i) => {
        return <div key={i} style={{ height }} className="card" onClick={goForm}></div>
      })}
    </div>
  )
}

export default Home
