# Vercel deployment notes

This project is structured as a hybrid frontend + Express app.

For Vercel, the frontend can be served from the Vite build output and the API can be handled through the Vercel serverless entry at `api/index.ts`.

## Environment variables

Set these in the Vercel project settings:

- `GEMINI_API_KEY`
- `SEMANTIC_SCHOLAR_API_KEY`
- `VITE_API_URL` (optional, only if your API is hosted on a separate domain)

## Build settings

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Local development

```bash
npm run dev
```
