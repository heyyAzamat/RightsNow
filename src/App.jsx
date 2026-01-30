import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import Course from './pages/Course'
import Stories from './pages/Stories'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/course" element={<Course />} />
            <Route path="/stories" element={<Stories />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
