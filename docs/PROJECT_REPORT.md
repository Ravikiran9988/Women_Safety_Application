# Women Safety Project Report

## 1. Introduction

Women Safety is a real-time emergency response solution built as a three-tier system:
- mobile app for SOS generation,
- backend API for event processing and storage,
- admin dashboard for monitoring and intervention.

The objective is to shorten emergency response time and provide location-aware incident tracking.

## 2. Architecture

### Components
- **Mobile App (`mobile-app`)**
  - Expo React Native app for end users
  - Captures location and sends SOS/tracking payloads
- **Backend (`backend`)**
  - Express API using MVC structure
  - Persists users, SOS incidents, and tracking points in MongoDB Atlas
- **Admin Dashboard (`admin-dashboard`)**
  - React + Vite web app
  - Visual monitoring (map/list/details), assignment, and resolution workflows

### Data Flow
1. User triggers SOS in mobile app.
2. Backend creates SOS record and returns `sosId`.
3. Mobile sends periodic tracking updates with the same `sosId`.
4. Admin dashboard polls active incidents and tracking data.
5. Admin assigns responder and resolves incident.
6. Incident moves into history.

## 3. Features

- Guest/user SOS mode in mobile app
- Background-style tracking update pipeline
- Admin authentication and session handling
- Real-time active SOS view with map markers
- Assignment and resolution action controls
- History retrieval and export support
- Health check endpoint for service monitoring

## 4. Working Flow

### Mobile Flow
- Welcome/Login -> SOS screen -> hold SOS button
- App captures location
- App sends `POST /api/sos`
- App sends tracking updates `POST /api/tracking`

### Backend Flow
- Request validation
- Controller dispatch by route
- Mongoose persistence
- Structured JSON response for frontend/mobile consumption

### Admin Flow
- Login via `POST /api/admin/login`
- Dashboard reads active SOS list
- Selecting SOS fetches tracking points
- Admin can assign/resolve from details panel

## 5. Database Design

### Collections
- **admins**
  - `email`, `password`
- **users**
  - `name`, `phone`, timestamps
- **sos**
  - `mode`, `status`, `profile`, `initialLocation`, `lastLocation`, `assignedResponder`, timestamps
- **tracking**
  - `sosId`, `location`, `timestamp`

### Relationship
- One `SOS` -> many `Tracking` points through `sosId`
- Optional `SOS.userId` -> `User`

## 6. API Design

- REST-style endpoint grouping:
  - `/api/admin/*`
  - `/api/sos/*`
  - `/api/tracking/*`
  - `/api/users/*`
- Backward-compatible aliases included for older clients:
  - `/api/active-sos`
  - `/api/tracking/:sosId`
  - `/api/latest`
- Standard response shape:
  - `ok`, `error/message`, and data payload objects

## 7. Challenges and Fixes

- **Folder restructuring risk**
  - Mitigated by controlled folder move and path-safe layout
- **Duplicate backend server files**
  - Removed alternate server implementations, kept single `server.mjs`
- **Route consistency**
  - Validated active/tracking/history/resolve flows after restructure
- **Cross-project environment management**
  - Split env examples per project and documented setup

## 8. Future Scope

- Add automated integration tests (Jest + Supertest + Playwright)
- Add RBAC and stricter API authorization policies
- Add push notifications for new SOS events
- Add responder dispatch module and SLA tracking
- Add deployment manifests (Docker/CI/CD)

