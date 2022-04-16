import React, { useEffect, useRef, useState } from 'react'
import { getRandomHeight } from '../utils'
import { useNavigate, useMatch } from 'react-router-dom'
import FlipAnimation from '../components/FlipAnimation'

const heights = Array.from({ length: 20 }, () => getRandomHeight())

function Home() {
  const isFixed = useFixed()
  const flipRef = useRef<any>()
  const match = useMatch('/')

  const navigate = useNavigate()
  const goForm = () => navigate('/form')

  useEffect(() => {
    flipRef.current.updateConfig()
  }, [isFixed])

  const style: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
    background: '#ededef',
    paddingTop: isFixed ? 80 : 0,
  }

  return (
    <div style={style}>
      <header
        style={{
          visibility: !match ? 'hidden' : 'visible',
        }}
        className={`flex px-4 pt-10 pb-4 ${isFixed ? 'fixed-style' : ''}`}
      >
        <FlipAnimation ref={flipRef} flipId="settings" animationType="font">
          <h1 className="title" style={{ fontSize: isFixed ? 18 : 48, height: isFixed ? 26 : 48 }}>
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

let scrollTop = 0

function useFixed() {
  const [isFixed, setIsFixed] = useState(scrollTop > 40)

  useEffect(() => {
    const handler = () => {
      if (document.documentElement.scrollTop > 0 || scrollTop < 40) {
        // 页面跳转前记住滚动条高度, 跳转后会突然变成0, 要记住变成0之前的值
        scrollTop = document.documentElement.scrollTop
      }

      if (document.documentElement.scrollTop > 40) {
        if (!isFixed) {
          setIsFixed(true)
        }
      } else if (isFixed) {
        setIsFixed(false)
      }
    }

    window.addEventListener('scroll', handler)

    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [isFixed])

  return isFixed
}

export default Home
