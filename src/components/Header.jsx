import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/logo.svg" alt="RightsNow" className="logo-img" />
            <span className="logo-text">RightsNow</span>
          </Link>
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Главная
            </Link>
            <Link 
              to="/map" 
              className={`nav-link ${isActive('/map') ? 'active' : ''}`}
            >
              Карта нарушений
            </Link>
            <Link 
              to="/course" 
              className={`nav-link ${isActive('/course') ? 'active' : ''}`}
            >
              Обучение
            </Link>
            <Link 
              to="/stories" 
              className={`nav-link ${isActive('/stories') ? 'active' : ''}`}
            >
              Истории
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
