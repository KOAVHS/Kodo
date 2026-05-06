# FastAPI Backend para Kōdo

API REST para la app móvil de estudio con IA

## Stack

- **FastAPI** 0.104.1
- **SQLAlchemy** 2.0.23 + aiosqlite (async)
- **JWT** para autenticación
- **Pydantic** para validación
- **CORS** habilitado

## Setup

```bash
# Crear venv
python -m venv venv

# Activar venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Estructura

```
backend/
├── main.py              # Entrada principal
├── requirements.txt     # Dependencias
├── .env.example         # Variables de entorno
├── app/
│   ├── __init__.py
│   ├── core/
│   │   ├── config.py    # Configuración
│   │   ├── security.py  # JWT, hashing
│   │   └── database.py  # Conexión DB
│   ├── models/
│   │   ├── user.py
│   │   └── study.py
│   ├── schemas/
│   │   └── schemas.py   # Pydantic models
│   ├── routers/
│   │   ├── auth.py
│   │   ├── roadmap.py
│   │   ├── study.py
│   │   └── stats.py
│   └── services/
│       ├── auth.py
│       ├── roadmap.py
│       └── suggestions.py
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh token

### Roadmaps
- `GET /api/roadmaps` - Listar todos
- `GET /api/roadmaps/{id}` - Obtener uno
- `POST /api/roadmaps/generate` - Generar con IA
- `POST /api/roadmaps/{id}/steps/{step_id}/complete` - Marcar como completado

### Stats
- `GET /api/stats` - Estadísticas usuario
- `GET /api/stats/weekly` - Stats semanales
- `POST /api/stats/session` - Registrar sesión

