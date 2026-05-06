# Kōdo — Mobile Learning App

Una app completa fullstack para aprendizaje personalizado con IA.

## 📱 Estructura del Proyecto

```
kodo/
├── frontend/                # React Native + Expo (iOS/Android)
│   ├── app/                 # Navegación y pantallas
│   ├── components/          # Componentes reutilizables
│   ├── hooks/              # Hooks custom
│   ├── services/           # API calls al backend
│   ├── store/              # Zustand state management
│   ├── constants/          # Temas, colores, roadmaps
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                 # FastAPI + SQLAlchemy (Python)
│   ├── app/
│   │   ├── core/           # Configuración, DB, security
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Lógica de negocio
│   │   └── __init__.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── README.md               # Este archivo
├── .gitignore             # Git ignore global
└── docker-compose.yml     # (Próximo paso)

```

## 🚀 Tech Stack

### Frontend
- **Expo 51** - Build universal apps
- **React Native 0.74** - Mobile framework
- **Expo Router** - File-based routing
- **Zustand** - State management
- **TypeScript** - Type safety
- **expo-sensors** - Hardware effects
- **expo-notifications** - Smart reminders

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM async
- **JWT** - Authentication
- **Pydantic** - Data validation
- **SQLite** - Database

## 🔧 Setup Rápido

### Backend

```bash
cd backend

# Crear venv
python -m venv venv

# Activar venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Copiar .env
cp .env.example .env

# Ejecutar servidor
python main.py
# O con uvicorn
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# O directamente con Expo
npx expo start
```

## 📚 Features Principales

### Authentication
- [x] Registro de usuarios
- [x] Login/Logout
- [x] JWT tokens
- [ ] OAuth (GitHub/Google)
- [ ] Refresh tokens

### Roadmaps
- [x] Generar roadmaps con IA
- [x] Múltiples niveles (beginner/intermediate/advanced)
- [x] Seguimiento de progreso
- [ ] Sugerencias personalizadas
- [ ] Recursos por paso

### Estadísticas
- [x] Rastreo de sesiones
- [x] Estadísticas semanales
- [ ] Análisis de tendencias
- [ ] Badges y logros

## 🔐 Variables de Entorno

### Backend (.env)
```
DATABASE_URL=sqlite+aiosqlite:///./kodo.db
SECRET_KEY=your-secret-key-here
DEBUG=True
CORS_ORIGINS=["http://localhost:3000"]
```

### Frontend (.env o app.json)
```
EXPO_PUBLIC_API_URL=http://localhost:8000/api
```

## 📡 API Endpoints

Ver [backend/README.md](backend/README.md) para lista completa.

```
GET    /api/health              # Health check
POST   /api/auth/register       # Registrar
POST   /api/auth/login          # Login
GET    /api/roadmaps            # Listar roadmaps
POST   /api/roadmaps/generate   # Generar con IA
GET    /api/stats               # Estadísticas
```

## 🚧 Próximos Pasos

- [ ] Docker & Docker Compose
- [ ] Tests (pytest, jest)
- [ ] CI/CD (GitHub Actions)
- [ ] Deployment (AWS/Vercel)
- [ ] Integración con OpenAI/Claude para mejor IA
- [ ] Mobile notifications
- [ ] Offline support
- [ ] Analytics

## 📝 Development Notes

### Convenciones de Código
- **Frontend**: PascalCase para componentes, camelCase para funciones
- **Backend**: snake_case para variables, PascalCase para clases
- Usar TypeScript en frontend
- Usar type hints en backend

### Git Workflow
```bash
git checkout -b feature/nombre-feature
git commit -m "feat: descripción"
git push origin feature/nombre-feature
```

## 📧 Contacto

Preguntas o sugerencias → [tu email/discord/github]

---

Made with ❤️ for learning
# o presionar 'a' para Android emulator
```

## flujo de navegación

```
index.tsx
  ├── sin roadmap → onboarding/step1 → step2 → step3 → (tabs)
  └── con roadmap → (tabs)/roadmap
```

## roadmaps predefinidos (plan free)

- inglés — desde cero, básico, intermedio
- programación (Python) — desde cero, básico
- matemáticas — desde cero
- diseño — próximamente

## plan pro (RevenueCat)

- cualquier tema personalizado vía Claude API
- ajuste dinámico del roadmap
- stats completas (12 meses)

## conectar con backend

En `services/api.ts` configura:

```ts
const API_URL = 'https://tu-backend.railway.app'
```

## próximos pasos

- [ ] dashboard (tabs/index.tsx)
- [ ] stats (tabs/stats.tsx)
- [ ] metas (tabs/goals.tsx)
- [ ] efecto líquido en barras con expo-sensors
- [ ] notificaciones push inteligentes
- [ ] OAuth GitHub + Google
- [ ] conexión con backend FastAPI
