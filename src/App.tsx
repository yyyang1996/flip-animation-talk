import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/Form'
import { FlipAnimationProvider } from './components/FlipAnimationProvider'
import './App.css'

function App() {
  return (
    <FlipAnimationProvider>
      <div className="App" style={{ position: 'relative' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </div>
    </FlipAnimationProvider>
  )
}

export default App
