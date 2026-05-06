# Contributing to Kōdo

Gracias por tu interés en contribuir a Kōdo 🎉

## Cómo Contribuir

### 1. Crear un Issue
- Reporta bugs o sugiere features
- Describe el problema claramente
- Agrega context y ejemplos

### 2. Fork & Clonar
```bash
git clone tu-fork
cd kodo
bash setup.sh  # O setup.bat en Windows
```

### 3. Crear una rama
```bash
git checkout -b feature/nombre-descriptivo
```

### 4. Hacer cambios
- Sigue convenciones de código
- Escribe tests si es necesario
- Actualiza docs

### 5. Commit & Push
```bash
git commit -m "feat: descripción del cambio"
git push origin feature/nombre-descriptivo
```

### 6. Pull Request
- Describe qué cambió y por qué
- Linkea issues relacionados
- Espera review

## Convenciones de Código

### Commits
```
feat: agregar feature
fix: corregir bug
docs: actualizar documentación
refactor: mejorar código
test: agregar tests
```

### Frontend (TypeScript/React)
- PascalCase para componentes
- camelCase para variables/funciones
- Usar type hints explícitamente
- Componentes funcionales + hooks

### Backend (Python)
- snake_case para variables/funciones
- PascalCase para clases
- Type hints en todas las funciones
- Docstrings en métodos públicos

## Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm test
```

## Preguntas?

- Abre una discussion
- Revisa issues abiertos
- Consulta DEVELOPMENT.md

---

¡Gracias por contribuir! ❤️
