import { useState } from 'react'
import { sampleStories, STORY_CATEGORIES } from '../data/storiesData'
import './Stories.css'

function Stories() {
  const [stories, setStories] = useState(sampleStories)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    country: '',
    content: ''
  })

  const filteredStories = selectedCategory
    ? stories.filter(s => s.category === selectedCategory)
    : stories

  const handleSubmitStory = (e) => {
    e.preventDefault()
    if (!formData.content.trim()) return

    const newStory = {
      id: Date.now(),
      category: formData.category || 'other',
      country: formData.country || 'Не указано',
      date: new Date().toISOString().split('T')[0],
      content: formData.content,
      tags: []
    }

    setStories([newStory, ...stories])
    setFormData({ category: '', country: '', content: '' })
    setShowForm(false)
    alert('Спасибо за вашу историю. Она была добавлена анонимно.')
  }

  return (
    <div className="stories-page">
      <div className="container">
        <div className="stories-header">
          <h1 className="page-title">Анонимные истории</h1>
          <p className="page-subtitle">
            Безопасное пространство для обмена личным опытом нарушений прав человека
          </p>
        </div>

        <div className="stories-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Отменить' : 'Поделиться историей'}
          </button>
        </div>

        {showForm && (
          <div className="story-form-card">
            <h2>Поделитесь своей историей</h2>
            <p className="form-note">
              Все истории публикуются анонимно. Вы можете не указывать страну и категорию.
            </p>
            <form onSubmit={handleSubmitStory}>
              <div className="form-group">
                <label>Категория нарушения (необязательно)</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Выберите категорию</option>
                  {STORY_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Страна (необязательно)</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="Оставьте пустым для анонимности"
                />
              </div>

              <div className="form-group">
                <label>Ваша история *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Опишите ситуацию, с которой вы столкнулись..."
                  rows={8}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Опубликовать анонимно
              </button>
            </form>
          </div>
        )}

        <div className="stories-filters">
          <button
            className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Все истории
          </button>
          {STORY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <div className="stories-grid">
          {filteredStories.length === 0 ? (
            <div className="no-stories">
              <p>Пока нет историй в этой категории.</p>
            </div>
          ) : (
            filteredStories.map(story => {
              const category = STORY_CATEGORIES.find(c => c.id === story.category)
              return (
                <div key={story.id} className="story-card">
                  <div className="story-header">
                    <div className="story-meta">
                      <span className="story-category">
                        {category?.icon} {category?.label || 'Другое'}
                      </span>
                      <span className="story-date">{story.date}</span>
                    </div>
                    {story.country !== 'Не указано' && (
                      <span className="story-country">{story.country}</span>
                    )}
                  </div>
                  <div className="story-content">
                    {story.content}
                  </div>
                  {story.tags && story.tags.length > 0 && (
                    <div className="story-tags">
                      {story.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Stories
