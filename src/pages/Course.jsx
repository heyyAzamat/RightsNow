import { useState } from 'react'
import { courseLessons } from '../data/courseData'
import './Course.css'

function Course() {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [completedLessons, setCompletedLessons] = useState(new Set())

  const lesson = courseLessons[currentLesson]
  const isLastLesson = currentLesson === courseLessons.length - 1

  const handleAnswerSelect = (index) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    if (selectedAnswer === lesson.quiz.correct) {
      setCompletedLessons(new Set([...completedLessons, currentLesson]))
    }
  }

  const handleNext = () => {
    setCurrentLesson(currentLesson + 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handlePrevious = () => {
    setCurrentLesson(currentLesson - 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  return (
    <div className="course-page">
      <div className="container">
        <div className="course-header">
          <h1 className="page-title">Образовательный курс</h1>
          <p className="page-subtitle">
            Изучите основные права человека простым и понятным языком
          </p>
        </div>

        <div className="course-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentLesson + 1) / courseLessons.length) * 100}%` }}
            />
          </div>
          <div className="progress-text">
            Урок {currentLesson + 1} из {courseLessons.length}
          </div>
        </div>

        <div className="lessons-sidebar">
          {courseLessons.map((l, index) => (
            <button
              key={l.id}
              className={`lesson-nav-item ${index === currentLesson ? 'active' : ''} ${completedLessons.has(index) ? 'completed' : ''}`}
              onClick={() => {
                setCurrentLesson(index)
                setSelectedAnswer(null)
                setShowResult(false)
              }}
            >
              {completedLessons.has(index) && '✓ '}
              {l.title}
            </button>
          ))}
        </div>

        <div className="lesson-content">
          <div className="lesson-card">
            <h2 className="lesson-title">{lesson.title}</h2>
            <div 
              className="lesson-body"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>

          {lesson.quiz && (
            <div className="quiz-card">
              <h3 className="quiz-title">Проверьте свои знания</h3>
              <p className="quiz-question">{lesson.quiz.question}</p>
              <div className="quiz-options">
                {lesson.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-option ${
                      selectedAnswer === index ? 'selected' : ''
                    } ${
                      showResult
                        ? index === lesson.quiz.correct
                          ? 'correct'
                          : selectedAnswer === index && index !== lesson.quiz.correct
                          ? 'incorrect'
                          : ''
                        : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {!showResult && (
                <button
                  className="btn btn-primary quiz-submit"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                >
                  Проверить ответ
                </button>
              )}
              {showResult && (
                <div className="quiz-result">
                  <div className={`result-message ${selectedAnswer === lesson.quiz.correct ? 'success' : 'error'}`}>
                    {selectedAnswer === lesson.quiz.correct
                      ? '✓ Правильно!'
                      : '✗ Неправильно'}
                  </div>
                  <div className="result-explanation">
                    {lesson.quiz.explanation}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="lesson-navigation">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentLesson === 0}
            >
              ← Предыдущий урок
            </button>
            {!isLastLesson && (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={lesson.quiz && !showResult}
              >
                Следующий урок →
              </button>
            )}
            {isLastLesson && showResult && (
              <div className="course-complete">
                <h3>🎉 Поздравляем!</h3>
                <p>Вы завершили курс по правам человека</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Course
