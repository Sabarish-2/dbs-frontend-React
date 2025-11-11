# dbs-frontend-React

Lightweight React frontend for the Digital BookStore project. This repository contains the single-page application used to interact with the DBS backend (API, auth, data flows) from https://github.com/Sabarish-2/DigitalBookStore-Backend.

## Features
- React-based UI
- Environment-driven API endpoint configuration
- Opinionated folder structure for scalable components and services

## Project working
- Single-page app: client-side routing (React Router or equivalent) handles navigation without full page reloads.
- API communication: services layer centralizes REST/HTTP calls to REACT_APP_API_URL; use fetch/axios and a shared error/response handler.
- Data flow: components call services/hooks to fetch/update data. Use React Query / SWR or custom caching to reduce requests and simplify loading/error states.
- UI state: local component state for transient UI; context or state management (Redux/Context) for global application state (auth, user, feature flags).
- Error handling & UX: global error boundary for render errors, centralized toast/notification for API errors and success messages.
- Security & CORS: backend must allow CORS for the configured REACT_APP_API_URL.

## Prerequisites
- Node.js >= 16
- npm >= 8 or Yarn

## Available scripts
- npm start / yarn start — start dev server with hot reload
- npm run build / yarn build — create production build in `build/` or `dist/`
- npm test / yarn test — run unit tests
- npm run lint / yarn lint — run linter (ESLint)
- npm run format / yarn format — format code (Prettier)

## Current folder structure
- src/
  - components/       — presentational and shared components
  - pages/            — route-level pages
  - services/         — API calls, auth, data layer
  - hooks/            — reusable hooks
  - context/          — React context providers
  - assets/           — images, fonts, styles
  - utils/            — helpers, constants
  - App.jsx/tsx       — app entry
  - index.jsx/tsx     — render and global providers

## Building & Deployment
- Build: npm run build
- Serve static build with any static server or host on Netlify, or a container.

## Troubleshooting
- If the app fails to fetch data, verify REACT_APP_API_URL and CORS on the backend.
- For build issues, clear node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
