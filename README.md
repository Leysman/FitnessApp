# FitnessApp

Небольшое приложение для отслеживания тренировок, целей и активности.  
Фронтенд на **React + Vite**, бэкенд на **Node.js/Express**, база **MongoDB**.  
Аутентификация — **JWT (passport-jwt)**.

## Демо (прод)
- Frontend (Vercel): https://fitness-app-fawn-gamma.vercel.app
- Backend (Render): https://fitnessapp-xc57.onrender.com
- Health-check API: `GET https://fitnessapp-xc57.onrender.com/health` → `{ ok: true }`

> ⚠️ На бесплатном Render первый запрос после простоя может быть долгим (cold start).

---

## Стек

**Client**
- React + Vite
- Axios
- Jest (снапшот-тесты)
- SVGR для SVG

**Server**
- Express
- Mongoose (MongoDB)
- Passport + passport-jwt
- CORS
- Multer / Cloudinary (загрузка файлов) — опционально
- Nodemailer (почта) — опционально

---

## Структура репозитория

```
client/        # фронтенд (Vite)
backend/       # бэкенд (Express)
```

---

## Как запустить локально

### 1) Клонирование
```bash
git clone https://github.com/Leysman/FitnessApp.git
cd FitnessApp
```

### 2) Установка зависимостей
```bash
# фронт
cd client
npm install

# бэк
cd ../backend
npm install
```

### 3) Переменные окружения

**client/.env.development**
```env
# В дев-режиме фронт ходит прямо к локальному API
VITE_API_URL=http://localhost:4000/api
```

**backend/.env**
```env
PORT=4000
# строка подключения к MongoDB
MONGO_URI=mongodb+srv://USER:PASS@CLUSTER/DB?retryWrites=true&w=majority
# секрет для JWT
SECRET_OR_KEY=some_long_secret_string

# Разрешённые источники для CORS (через запятую)
CORS_ORIGINS=http://localhost:5173

# (опционально) если используете почту
NODEMAILER_USER=your@gmail.com
NODEMAILER_PASSWORD=your_app_password
NODEMAILER_SERVICE=gmail

# (опционально) загрузка в Cloudinary
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

> Убедись, что `.env` файлы добавлены в `.gitignore`.

### 4) Запуск

**Backend**
```bash
cd backend
npm run server   # nodemon
# или
npm start        # node server.js
```

**Frontend**
```bash
cd client
npm run dev
```

Открой `http://localhost:5173`.  
API слушает `http://localhost:4000`, маршруты начинаются с `/api`.

---

## Основные эндпоинты API (кратко)

Префикс всех маршрутов: `/api`

- `POST /users/register` — регистрация
- `POST /users/login` — логин (возвращает JWT)
- `GET  /configs` — глобальные настройки/данные
- `GET/POST/… /posts` — посты
- `GET/POST/… /comments` — комментарии
- `GET/POST/… /awards` — награды
- `GET/POST/… /workouts` — тренировки *(требует JWT)*
- `GET/POST/… /goals` — цели *(требует JWT)*

Health:
- `GET /health` → `{ ok: true }`

---

## Деплой (как у меня)

### Frontend — Vercel
- **Root Directory**: `client/`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL=https://<your-api>.onrender.com/api`

Для SPA роутинга добавлен `client/vercel.json`:
```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Backend — Render
- **Root Directory**: `backend/`
- **Build Command**: `npm install` *(или `npm ci` при наличии lock-файла)*
- **Start Command**: `npm start` *(в package.json — `"start": "node server.js"`)*  
- **Environment** → переменные:
  - `MONGO_URI=...`
  - `SECRET_OR_KEY=...`
  - `CORS_ORIGINS=https://<your-frontend>.vercel.app,http://localhost:5173`
  - (опционально) `CLOUDINARY_*`, `NODEMAILER_*`

---

## Скрипты

**client/package.json**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 5173",
    "test": "jest",
    "lint": "eslint \"src/**/*.{js,jsx}\"",
    "lint:fix": "eslint \"src/**/*.{js,jsx}\" --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,css,md}\""
  }
}
```

**backend/package.json**
```json
{
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

---

## Важные моменты / частые ошибки

- **404 на `/users/login` в проде** → проверь, что `VITE_API_URL` заканчивается на `/api`.  
  Должно быть: `https://<api>.onrender.com/api`.

- **CORS error** → в `CORS_ORIGINS` на бэке должен быть точный домен фронта  
  `https://<your-frontend>.vercel.app` (без `/` в конце).  
  Превью-деплои Vercel имеют другие домены — их нужно добавлять отдельно или тестировать на прод-домене.

- **Долгий первый запрос** → это cold start на бесплатном Render (норма).

- **`npm ci` падает на Render** → в папке нет `package-lock.json`. Либо добавьте lock-файл, либо используйте `npm install`.

- **Windows предупреждение `LF will be replaced by CRLF`** — это не ошибка, просто разная концовка строк. Игнорируйте.

---

## Планы / TODO (после защиты)

- Перенести MongoDB кластер в регион ближе к Vercel/Render (уменьшить задержки).
- Включить `compression()` на бэкенде (gzip).
- Добавить индексы в коллекции (email, createdAt и т.п.).
- Оформить `.env.example` для обоих пакетов.
- Пройтись по уязвимостям `npm audit`.

---

## Автор

- **Leysman** — фронтенд/частично бэкенд.  
Пулл-реквесты и советы приветствуются :)
