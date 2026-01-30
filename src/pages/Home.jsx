import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">RightsNow</h1>
            <p className="hero-subtitle">
              Платформа для изучения и понимания прав человека во всём мире
            </p>
            <p className="hero-description">
              Интерактивная карта нарушений, образовательный курс и анонимные истории людей, 
              столкнувшихся с нарушениями своих прав.
            </p>
            <div className="hero-actions">
              <Link to="/map" className="btn btn-primary">
                Изучить карту
              </Link>
              <Link to="/course" className="btn btn-secondary">
                Начать обучение
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Возможности платформы</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Интерактивная карта</h3>
              <p>
                Изучите случаи нарушений прав человека по странам и категориям. 
                Каждая точка на карте содержит краткие объяснения и примеры реальных ситуаций.
              </p>
              <Link to="/map" className="feature-link">
                Открыть карту →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Образовательный курс</h3>
              <p>
                Простой и понятный курс об основных правах человека. 
                Мини-квизы и практические ситуации помогут лучше понять тему.
              </p>
              <Link to="/course" className="feature-link">
                Начать курс →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Анонимные истории</h3>
              <p>
                Безопасное пространство для обмена личным опытом. 
                Читайте реальные кейсы и делитесь своими историями анонимно.
              </p>
              <Link to="/stories" className="feature-link">
                Читать истории →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">стран на карте</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">6</div>
              <div className="stat-label">категорий нарушений</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">зарегистрированных случаев</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
