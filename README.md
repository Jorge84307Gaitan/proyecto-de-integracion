# Urban Eye

Migracion del proyecto a arquitectura full stack:

- Frontend: React + Vite + React Router + Ant Design + SCSS
- Backend: Express + JWT + Multer (uploads locales) + persistencia JSON local

## Estructura

- `frontend/`: app React
- `backend/`: API Express
- `assets/`: recursos visuales compartidos
- `src/urban_eye/`: version legacy en Streamlit (se mantiene como referencia)

## Requisitos

- Node.js 20+

## Configuracion

1. Backend:
```powershell
cd backend
copy .env.example .env
```
2. Frontend:
```powershell
cd ../frontend
copy .env.example .env
```
3. Edita las variables en `backend/.env` y `frontend/.env`.

Datos locales:
- Usuarios: `backend/data/users.json`
- Reportes: `backend/data/incidents.json`
- Archivos subidos: `backend/uploads/`

## Ejecutar en desarrollo

1. Backend:
```powershell
cd backend
npm install
npm run dev
```
2. Frontend:
```powershell
cd frontend
npm install
npm run dev
```

## Build frontend

```powershell
cd frontend
npm run build
```
