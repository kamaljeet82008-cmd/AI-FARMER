# KrishiMitra AI

## Run
```
npm install
npm run dev
```
Open http://localhost:5173

## Keys (.env file)
- `VITE_GEMINI_API_KEY` – from https://aistudio.google.com (AI photo analysis + voice assistant answers).
  Without it the app still runs; AI features show a "key not set" message.
- `VITE_FIREBASE_*` – from Firebase Console > Project settings > Your apps (web `</>`).
  Without them the app runs in **demo mode** (accounts and data stay in this browser only).
Restart `npm run dev` after changing `.env`. Never upload `.env` to GitHub.

- `VITE_OPENROUTER_API_KEY` – free alternative from https://openrouter.ai/keys. If set, AI uses OpenRouter (`openrouter/free` model) instead of Gemini.

## Firebase setup (only for real login + cloud backup)
1. Authentication > Sign-in method > enable Email/Password and Google.
2. Firestore Database > Create database (region asia-south1) > Rules tab > paste `firestore.rules`.
3. Storage > Rules > paste `storage.rules`.
With Firebase keys set, farmer data is backed up to Firestore under `users/{uid}`.

## Known limits
- Mandi prices, seed shops and experts' nearby search are sample/hardcoded or map links, not live APIs yet.
- The Gemini key lives in the browser (fine for demo). For a public launch move it to Cloud Functions.
