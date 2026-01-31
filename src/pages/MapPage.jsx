import { useState, useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import { VIOLATION_CATEGORIES, VIOLATIONS_BY_COUNTRY, getViolationsForCountry, getCategoryById } from '../data/violations'
import './MapPage.css'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Маппинг ISO 3166-1 alpha-3 (3 буквы) в ISO 3166-1 alpha-2 (2 буквы) для карты
const countryCodeMap = {
  'RUS': 'RU',
  'CHN': 'CN',
  'USA': 'US',
  'IRN': 'IR',
  'SAU': 'SA',
  'TUR': 'TR',
  'IND': 'IN',
  'BRA': 'BR',
  'NGA': 'NG',
  'EGY': 'EG',
  'MEX': 'MX',
  'UKR': 'UA',
  'BLR': 'BY',
  'MMR': 'MM',
  'SYR': 'SY',
  'YEM': 'YE',
  'PRK': 'KP',
  'AFG': 'AF',
  'VEN': 'VE',
  'PHL': 'PH',
  'POL': 'PL',
  'HUN': 'HU',
}

// Маппинг ISO-3 кодов в названия стран
const countryNames = {
  'RUS': 'Россия',
  'CHN': 'Китай',
  'USA': 'США',
  'IRN': 'Иран',
  'SAU': 'Саудовская Аравия',
  'TUR': 'Турция',
  'IND': 'Индия',
  'BRA': 'Бразилия',
  'NGA': 'Нигерия',
  'EGY': 'Египет',
  'MEX': 'Мексика',
  'UKR': 'Украина',
  'BLR': 'Беларусь',
  'MMR': 'Мьянма',
  'SYR': 'Сирия',
  'YEM': 'Йемен',
  'PRK': 'КНДР',
  'AFG': 'Афганистан',
  'VEN': 'Венесуэла',
  'PHL': 'Филиппины',
  'POL': 'Польша',
  'HUN': 'Венгрия',
}

// Координаты стран для маркеров (упрощённый вариант)
const countryCoordinates = {
  'RUS': [100, 60],
  'CHN': [105, 35],
  'USA': [-95, 38],
  'IRN': [53, 32],
  'SAU': [45, 25],
  'TUR': [35, 39],
  'IND': [77, 20],
  'BRA': [-55, -15],
  'NGA': [8, 10],
  'EGY': [30, 27],
  'MEX': [-102, 23],
  'UKR': [32, 49],
  'BLR': [28, 53],
  'MMR': [96, 22],
  'SYR': [38, 35],
  'YEM': [44, 15],
  'PRK': [127, 40],
  'AFG': [66, 33],
  'VEN': [-66, 8],
  'PHL': [122, 13],
  'POL': [20, 52],
  'HUN': [20, 47],
}

function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCountryName, setSelectedCountryName] = useState(null)
  const [tooltipContent, setTooltipContent] = useState('')

  const filteredViolations = useMemo(() => {
    if (!selectedCategory) return VIOLATIONS_BY_COUNTRY
    return VIOLATIONS_BY_COUNTRY.filter(v => v.category === selectedCategory)
  }, [selectedCategory])

  const violationsByCountry = useMemo(() => {
    const grouped = {}
    filteredViolations.forEach(v => {
      if (!grouped[v.country]) {
        grouped[v.country] = []
      }
      grouped[v.country].push(v)
    })
    return grouped
  }, [filteredViolations])

  const handleCountryClick = (countryCode, countryName = null) => {
    const violations = getViolationsForCountry(countryCode)
    if (violations.length > 0) {
      setSelectedCountry(countryCode)
      setSelectedCountryName(countryName || countryNames[countryCode] || 'Неизвестная страна')
    }
  }

  const getCountryViolations = (countryCode) => {
    return violationsByCountry[countryCode] || []
  }

  const getTotalViolations = (countryCode) => {
    return getCountryViolations(countryCode).reduce((sum, v) => sum + v.count, 0)
  }

  return (
    <div className="map-page">
      <div className="container">
        <div className="map-header">
          <h1 className="page-title">Интерактивная карта нарушений</h1>
          <p className="page-subtitle">
            Изучите случаи нарушений прав человека по странам и категориям
          </p>
        </div>

        <div className="map-controls">
          <div className="category-filters">
            <button
              className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              Все категории
            </button>
            {VIOLATION_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ borderLeft: `4px solid ${cat.color}` }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="map-container">
          <div className="map-wrapper">
            <ComposableMap
              projectionConfig={{ scale: 147 }}
              style={{ width: '100%', height: '100%' }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const iso2Code = geo.properties.ISO_A2
                      // Находим соответствующий ISO-3 код
                      const iso3Code = Object.keys(countryCodeMap).find(
                        key => countryCodeMap[key] === iso2Code
                      )
                      const violations = iso3Code ? getCountryViolations(iso3Code) : []
                      const hasViolations = violations.length > 0
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={hasViolations ? '#FF9500' : '#e2e8f0'}
                          stroke="#cbd5e1"
                          strokeWidth={0.5}
                          style={{
                            default: {
                              fill: hasViolations ? '#FF9500' : '#e2e8f0',
                              outline: 'none',
                              cursor: hasViolations ? 'pointer' : 'default',
                            },
                            hover: {
                              fill: hasViolations ? '#FFB340' : '#cbd5e1',
                              outline: 'none',
                            },
                            pressed: {
                              fill: hasViolations ? '#E68600' : '#94a3b8',
                              outline: 'none',
                            },
                          }}
                          onClick={() => {
                            if (hasViolations && iso3Code) {
                              handleCountryClick(iso3Code, geo.properties.NAME)
                            }
                          }}
                          onMouseEnter={() => {
                            if (hasViolations && iso3Code) {
                              const total = getTotalViolations(iso3Code)
                              setTooltipContent(`${geo.properties.NAME}: ${total} случаев`)
                            }
                          }}
                          onMouseLeave={() => setTooltipContent('')}
                        />
                      )
                    })
                  }
                </Geographies>
                {Object.entries(violationsByCountry).map(([countryCode, violations]) => {
                  const coords = countryCoordinates[countryCode]
                  if (!coords) return null
                  
                  return (
                    <Marker key={countryCode} coordinates={coords}>
                      <circle
                        r={Math.min(Math.max(getTotalViolations(countryCode) / 5, 3), 12)}
                        fill={selectedCategory 
                          ? getCategoryById(selectedCategory)?.color || '#FF9500'
                          : '#ef4444'
                        }
                        opacity={0.7}
                        stroke="#fff"
                        strokeWidth={1}
                        onClick={() => handleCountryClick(countryCode, countryNames[countryCode])}
                        style={{ cursor: 'pointer' }}
                      />
                    </Marker>
                  )
                })}
              </ZoomableGroup>
            </ComposableMap>
            {tooltipContent && (
              <div className="map-tooltip">
                {tooltipContent}
              </div>
            )}
          </div>

          {selectedCountry && (
            <div className="country-details">
              <h3>{selectedCountryName}</h3>
              <p className="country-subtitle">Нарушения прав человека</p>
              {getViolationsForCountry(selectedCountry).map((violation, index) => {
                const category = getCategoryById(violation.category)
                return (
                  <div key={index} className="violation-item">
                    <div className="violation-header">
                      <span 
                        className="violation-category"
                        style={{ borderLeft: `4px solid ${category.color}` }}
                      >
                        {category.label}
                      </span>
                      <span className="violation-count">{violation.count} случаев</span>
                    </div>
                    <div className="violation-examples">
                      <strong>Примеры:</strong>
                      <ul>
                        {violation.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedCountry(null)
                  setSelectedCountryName(null)
                }}
              >
                Закрыть
              </button>
            </div>
          )}
        </div>

        <div className="map-legend">
          <h3>Легенда</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#FF9500' }}></div>
              <span>Страны с зарегистрированными нарушениями</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: '#e2e8f0' }}></div>
              <span>Страны без данных</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker"></div>
              <span>Размер маркера соответствует количеству случаев</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPage
