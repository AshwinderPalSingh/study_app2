# study_app2

A lightweight React + Vite app for the "Metabolic Cost of Modality" study.

## Run locally

```bash
npm install
npm run dev
```

## Data handling
- Session data is stored in `localStorage` under `mcom_session_v1`.
- Use `?rescue=true` on the URL to display the raw JSON for recovery.
- Participants can download their JSON at the end of the flow.

## Study content
Update the DKU content and quizzes in `src/data/studyContent.js`.
- Visuals must be bundled imports (no network/public URLs).

## Backend (Google Sheets)
The backend lives in `server/` and accepts a single POST at `/api/submit`.

**Do not** place service account keys in `src/` or `src/assets/`. Keep them under `server/credentials/` or outside the repo and reference by path.

### Server env
Create `server/.env` using `server/.env.example`:
- `GOOGLE_SHEET_ID`
- `GOOGLE_SHEET_RANGE` (default `Sheet1!A:K`)
- `GOOGLE_SERVICE_ACCOUNT_JSON` **or** `GOOGLE_SERVICE_ACCOUNT_KEY_PATH`
- `CORS_ORIGIN` (e.g. `http://localhost:5173`)

### Client env
Set the backend URL for the React app:
- `VITE_BACKEND_URL=https://your-backend.onrender.com`

### Local run
```bash
cd server
npm install
npm start
```
