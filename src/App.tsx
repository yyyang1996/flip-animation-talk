import { useState } from 'react'
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/Form'
import IconLucideChevronLeft from '~icons/lucide/chevron-left'
import './App.css'

function App() {
  const navigate = useNavigate()
  const isHome = !!useMatch('/')
  const isForm = !!useMatch('/form')

  return (
    <div className="App" style={{ position: 'relative' }}>
      <header
        style={{
          paddingBottom: isHome ? 40 : 16,
        }}
        className="flex px-4 pt-4 items-center overflow-hidden"
      >
        <div
          style={{ visibility: isHome ? 'hidden' : 'visible' }}
          className="flex h-12 w-12 justify-center items-center"
          onClick={() => navigate(-1)}
        >
          <IconLucideChevronLeft className=" text-[32px]" />
        </div>

        <h1
          className="title"
          style={{
            fontSize: isHome ? 48 : 18,
            transform: isHome ? `translate(-48px, 24px)` : `translate(0, 0)`,
            transition: `all 400ms ease`,
          }}
        >
          Settings
        </h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  )
}

export default App
