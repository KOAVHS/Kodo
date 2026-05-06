# kōdo

App móvil de aprendizaje personalizado para autodidactas.

## estructura

```
Kodo/
├── mobile/          # React Native + Expo
│   ├── app/
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── onboarding/
│   │   │   ├── step1.tsx
│   │   │   ├── step2.tsx
│   │   │   └── step3.tsx
│   │   └── (tabs)/
│   │       ├── _layout.tsx
│   │       └── roadmap.tsx
│   ├── constants/
│   │   ├── theme.ts
│   │   └── roadmaps.ts
│   ├── store/
│   │   └── kodoStore.ts
│   ├── package.json
│   └── app.json
│
└── backend/         # FastAPI + SQLAlchemy
    ├── app/
    │   ├── core/
    │   ├── models/
    │   ├── routers/
    │   ├── schemas/
    │   ├── services/
    │   └── main.py
    ├── requirements.txt
    └── .env.example
```

## setup mobile

```bash
cd mobile
npm install
npx expo start
# escanear QR con Expo Go
```

## setup backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```
