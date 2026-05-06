# study.log — backend

API REST con FastAPI para la app de estudio study.log.

## stack

- **FastAPI** — framework async
- **SQLAlchemy 2.0** — ORM async
- **SQLite** (dev) / **PostgreSQL** (prod)
- **OAuth2** — Google + GitHub (sin contraseñas)
- **JWT** — autenticación stateless

## estructura

```
backend/
├── app/
│   ├── core/
│   │   ├── config.py       # settings desde .env
│   │   ├── database.py     # engine + session async
│   │   └── security.py     # JWT utils + get_current_user
│   ├── models/
│   │   ├── user.py         # tabla users
│   │   └── study.py        # subjects, sessions, goals
│   ├── routers/
│   │   ├── auth.py         # /auth/github /auth/google
│   │   ├── study.py        # /subjects /sessions /goals
│   │   └── stats.py        # /stats/overview /stats/heatmap
│   ├── schemas/
│   │   └── schemas.py      # pydantic models
│   ├── services/
│   │   └── suggestions.py  # sugerencias IA por reglas
│   └── main.py             # app entry point
├── requirements.txt
└── .env.example
```

## setup local

```bash
# 1. clonar y entrar al directorio
cd backend

# 2. entorno virtual
python -m venv venv
source venv/bin/activate  # windows: venv\Scripts\activate

# 3. dependencias
pip install -r requirements.txt

# 4. variables de entorno
cp .env.example .env
# editar .env con tus credenciales OAuth

# 5. correr
uvicorn app.main:app --reload
```

## endpoints principales

| método | ruta | descripción |
|--------|------|-------------|
| GET | / | health check |
| GET | /auth/github/callback | OAuth GitHub |
| GET | /auth/google/callback | OAuth Google |
| GET | /me | perfil del usuario |
| GET | /subjects | listar materias |
| POST | /subjects | crear materia |
| POST | /sessions | registrar sesión |
| GET | /sessions?range=week | sesiones recientes |
| GET | /stats/overview | resumen general |
| GET | /stats/heatmap?months=3 | datos heatmap |
| GET | /goals | metas activas |
| POST | /goals | crear meta |
| GET | /suggestions | sugerencias IA |

## límites plan free

- máximo 5 materias
- stats del mes actual (heatmap: 1 mes)

## deploy en railway

```bash
# variable de entorno en Railway:
# DATABASE_URL=postgresql+asyncpg://...
# SECRET_KEY=...
# GITHUB_CLIENT_ID=...
# etc.

# start command:
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

docs interactivas disponibles en `/docs` cuando `ENVIRONMENT=development`.
