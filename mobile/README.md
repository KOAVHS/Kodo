# kōdo — mobile

App móvil en React Native + Expo para Kōdo.

## stack

- **Expo** (~51) + **expo-router** para navegación
- **React Native** 0.74
- **Zustand** para estado global
- **expo-sensors** para efecto líquido en barras
- **expo-auth-session** para OAuth GitHub/Google
- **expo-notifications** para recordatorios inteligentes

## estructura

```
kodo-mobile/
├── app/
│   ├── _layout.tsx          # root layout
│   ├── index.tsx            # splash + redirect
│   ├── onboarding/
│   │   ├── step1.tsx        # ¿qué quieres aprender?
│   │   ├── step2.tsx        # tiempo y nivel
│   │   └── step3.tsx        # generando roadmap
│   └── (tabs)/
│       ├── _layout.tsx      # nav inferior
│       ├── index.tsx        # dashboard
│       ├── roadmap.tsx      # roadmap activo
│       ├── stats.tsx        # estadísticas
│       └── goals.tsx        # metas semanales
├── constants/
│   ├── theme.ts             # colores, tipografía, espaciado
│   └── roadmaps.ts          # roadmaps predefinidos
├── store/
│   └── kodoStore.ts         # zustand store global
├── services/                # api calls al backend
├── hooks/                   # hooks custom
└── components/              # componentes reutilizables
```

## setup local

```bash
# instalar dependencias
npm install

# arrancar en modo desarrollo
npx expo start

# escanear QR con Expo Go en tu celular
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
