import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Form from './pages/Form'
import About from './pages/About'
import { FlipAnimationProvider } from './components/FlipAnimationProvider'
import AnimateRoutes from './components/AnimateRoutes'
import './App.css'

function App() {
  return (
    <FlipAnimationProvider>
      <div className="App" style={{ position: 'relative' }}>
        <AnimateRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/about" element={<About />} />
        </AnimateRoutes>
      </div>
    </FlipAnimationProvider>
  )
}

export default App
