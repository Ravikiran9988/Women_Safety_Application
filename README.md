# Women Safety Full-Stack Platform

Women Safety is a full-stack emergency response platform with:
- a **React Native (Expo)** mobile app for SOS triggering and live location sharing,
- a **Node.js + Express** backend with MongoDB Atlas,
- a **React (Vite)** admin dashboard for monitoring and resolving incidents.

## Features

- SOS creation from mobile app
- Live tracking updates tied to SOS ID
- Admin login and protected dashboard flows
- Active SOS feed + history view
- Assign responder and resolve workflows
- Health endpoint for deployment monitoring

## Tech Stack

- **Mobile:** React Native, Expo, TypeScript
- **Backend:** Node.js, Express, Mongoose, JWT
- **Admin:** React, Vite, Tailwind, Axios, Leaflet
- **Database:** MongoDB Atlas

## Folder Structure

```text
root/
├── mobile-app/          # Expo mobile application
├── admin-dashboard/     # Vite React admin panel
├── backend/             # Express API (MVC)
├── docs/
│   └── PROJECT_REPORT.md
├── README.md
└── .gitignore
```

## Environment Setup

Create env files from examples:

- `backend/.env.example`
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `PORT`
  - `CORS_ORIGINS`
- `mobile-app/.env.example`
  - `EXPO_PUBLIC_SOS_API_URL`
- `admin-dashboard/.env.example`
  - `VITE_API_URL`

## Installation and Run

Install dependencies in each app:

```bash
cd backend && npm install
cd ../mobile-app && npm install
cd ../admin-dashboard && npm install
```

### Backend

```bash
cd backend
npm run start
```

Runs on `http://localhost:3000` by default.

### Mobile App

```bash
cd mobile-app
npm run start
```

Use Expo Go on device or emulator.

### Admin Dashboard

```bash
cd admin-dashboard
npm run dev
```

Runs on `http://localhost:5173`.

## API Endpoints

### Health
- `GET /health`

### Admin
- `POST /api/admin/login`
- `GET /api/admin/profile`

### SOS
- `POST /api/sos`
- `GET /api/sos/active`
- `GET /api/sos/history`
- `GET /api/sos/:id`
- `PUT /api/sos/:id/assign`
- `PUT /api/sos/:id/resolve`
- `GET /api/sos/tracking/:sosId`

### Tracking
- `POST /api/tracking`
- `GET /api/tracking/sos/:sosId`
- `GET /api/tracking/latest`
- `GET /api/tracking/summary`

### Legacy compatibility
- `GET /api/active-sos`
- `GET /api/tracking/:sosId`
- `GET /api/latest`

## Admin Login (Default Seed)

- **Email:** `admin@example.com`
- **Password:** `admin123`

Use `backend/create-admin.mjs` to seed if needed.

