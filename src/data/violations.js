// Данные о нарушениях прав человека по странам и категориям
// ISO 3166-1 alpha-2 коды стран для карты

export const VIOLATION_CATEGORIES = [
  { id: 'freedom', label: 'Свобода слова и собраний', color: '#3b82f6' },
  { id: 'discrimination', label: 'Дискриминация', color: '#ef4444' },
  { id: 'torture', label: 'Пытки и жестокое обращение', color: '#dc2626' },
  { id: 'fair_trial', label: 'Право на справедливый суд', color: '#f59e0b' },
  { id: 'privacy', label: 'Неприкосновенность частной жизни', color: '#8b5cf6' },
  { id: 'labor', label: 'Трудовые права', color: '#10b981' },
];

export const VIOLATIONS_BY_COUNTRY = [
  { country: 'RUS', category: 'freedom', count: 45, examples: ['Законы об «иноагентах»', 'Ограничения митингов', 'Блокировка СМИ'] },
  { country: 'RUS', category: 'fair_trial', count: 32, examples: ['Политические дела', 'Отказ в адвокате'] },
  { country: 'CHN', category: 'freedom', count: 58, examples: ['Цензура интернета', 'Уйгурский вопрос'] },
  { country: 'CHN', category: 'privacy', count: 41, examples: ['Массовая слежка', 'Социальный рейтинг'] },
  { country: 'USA', category: 'discrimination', count: 38, examples: ['Расовое неравенство', 'Права мигрантов'] },
  { country: 'USA', category: 'labor', count: 22, examples: ['Права заключённых', 'Минимальная зарплата'] },
  { country: 'IRN', category: 'freedom', count: 52, examples: ['Протесты и репрессии', 'Права женщин'] },
  { country: 'IRN', category: 'torture', count: 28, examples: ['Пытки в СИЗО', 'Смертная казнь'] },
  { country: 'SAU', category: 'discrimination', count: 44, examples: ['Права женщин', 'Система опекунства'] },
  { country: 'SAU', category: 'freedom', count: 35, examples: ['Отсутствие свобод', 'Криминализация инакомыслия'] },
  { country: 'TUR', category: 'freedom', count: 39, examples: ['Давление на СМИ', 'Задержания журналистов'] },
  { country: 'TUR', category: 'fair_trial', count: 26, examples: ['Массовые аресты', 'Судебные процессы'] },
  { country: 'IND', category: 'discrimination', count: 36, examples: ['Кастовая дискриминация', 'Религиозные конфликты'] },
  { country: 'IND', category: 'labor', count: 29, examples: ['Детский труд', 'Условия на производстве'] },
  { country: 'BRA', category: 'labor', count: 31, examples: ['Рабский труд', 'Права коренных народов'] },
  { country: 'BRA', category: 'privacy', count: 18, examples: ['Насилие полиции', 'Нарушения в тюрьмах'] },
  { country: 'NGA', category: 'torture', count: 24, examples: ['Полицейское насилие', 'Конфликты на севере'] },
  { country: 'NGA', category: 'freedom', count: 30, examples: ['Похищения', 'Ограничения СМИ'] },
  { country: 'EGY', category: 'freedom', count: 48, examples: ['Тюрьмы для активистов', 'Цензура'] },
  { country: 'EGY', category: 'torture', count: 35, examples: ['Систематические пытки', 'Бессрочное заключение'] },
  { country: 'MEX', category: 'labor', count: 25, examples: ['Права мигрантов', 'Убийства журналистов'] },
  { country: 'MEX', category: 'fair_trial', count: 22, examples: ['Коррупция в судах', 'Исчезновения'] },
  { country: 'UKR', category: 'freedom', count: 20, examples: ['Военное положение', 'Ограничения в зоне конфликта'] },
  { country: 'UKR', category: 'privacy', count: 15, examples: ['Перемещённые лица', 'Доступ к информации'] },
  { country: 'BLR', category: 'freedom', count: 42, examples: ['Репрессии после 2020', 'Закрытие НКО'] },
  { country: 'BLR', category: 'torture', count: 19, examples: ['Пытки задержанных', 'Политические заключённые'] },
  { country: 'MMR', category: 'torture', count: 40, examples: ['Военный переворот', 'Массовые аресты'] },
  { country: 'MMR', category: 'freedom', count: 46, examples: ['Рохинджа', 'Закрытие интернета'] },
  { country: 'SYR', category: 'torture', count: 55, examples: ['Военные преступления', 'Исчезновения'] },
  { country: 'SYR', category: 'fair_trial', count: 48, examples: ['Суды без гарантий', 'Казни'] },
  { country: 'YEM', category: 'torture', count: 43, examples: ['Гуманитарный кризис', 'Насилие сторон конфликта'] },
  { country: 'YEM', category: 'labor', count: 25, examples: ['Детский труд', 'Рабство'] },
  { country: 'PRK', category: 'freedom', count: 60, examples: ['Полный контроль', 'Лагеря'] },
  { country: 'PRK', category: 'torture', count: 50, examples: ['Политические лагеря', 'Пытки'] },
  { country: 'AFG', category: 'discrimination', count: 52, examples: ['Права женщин', 'Образование'] },
  { country: 'AFG', category: 'freedom', count: 48, examples: ['Талибан', 'Запрет инакомыслия'] },
  { country: 'VEN', category: 'freedom', count: 38, examples: ['Преследование оппозиции', 'Кризис институтов'] },
  { country: 'VEN', category: 'labor', count: 28, examples: ['Миграция', 'Условия труда'] },
  { country: 'PHL', category: 'fair_trial', count: 30, examples: ['Внесудебные казни', '«Война с наркотиками»'] },
  { country: 'PHL', category: 'freedom', count: 25, examples: ['Убийства журналистов', 'Угрозы активистам'] },
  { country: 'POL', category: 'freedom', count: 22, examples: ['Суды и СМИ', 'Права ЛГБТ+'] },
  { country: 'POL', category: 'discrimination', count: 18, examples: ['Реформы юстиции', 'Права женщин'] },
  { country: 'HUN', category: 'freedom', count: 28, examples: ['Контроль СМИ', 'НКО'] },
  { country: 'HUN', category: 'discrimination', count: 20, examples: ['Мигранты', 'ЛГБТ+'] },
];

// Для отображения на карте нужны координаты (lat, lon) или использование кодов стран в topojson
// World map использует свойства типа ISO_A2 или NAME
export function getViolationsForCountry(iso) {
  return VIOLATIONS_BY_COUNTRY.filter(v => v.country === iso);
}

export function getCategoryById(id) {
  return VIOLATION_CATEGORIES.find(c => c.id === id);
}
