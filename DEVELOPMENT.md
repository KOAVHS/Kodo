# Kōdo Development

Guía rápida para desarrolladores

## 🎯 Primeros Pasos

### 1. Clonar & Setup
```bash
git clone <repo>
cd kodo
```

### 2. Backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python main.py
```

Acceso: http://localhost:8000

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Escanea con Expo Go o emula.

## 🔄 Workflow Típico

### Agregar feature en backend
```bash
cd backend
# Crear modelo
# Crear schema
# Crear servicio
# Crear router
# Actualizar main.py si es necesario
```

### Agregar feature en frontend
```bash
cd frontend
# Crear componente
# Crear hook si es necesario
# Conectar con servicio API
# Actualizar store si hay estado global
```

## 🧪 Testing

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

## 🐛 Debugging

### Backend
- Uvicorn tiene hot reload automático
- Ver logs en terminal
- FastAPI docs: http://localhost:8000/docs

### Frontend
- Expo Go muestra errores directamente
- Puedes usar console.log
- React DevTools disponible

## 📦 Adding Dependencies

### Backend
```bash
pip install [package]
pip freeze > requirements.txt
```

### Frontend
```bash
npm install [package]
```

## 🚀 Deployment (Próximo)

- [ ] Setup CI/CD
- [ ] Build mobile app
- [ ] Deploy backend (Heroku/Railway)
- [ ] EAS Build for mobile

---

¿Preguntas? Check README.md en la raíz
