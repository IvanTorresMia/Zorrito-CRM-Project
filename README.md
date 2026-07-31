# Zorrito Minerals Project Home

Internal file-and-content dashboard for the Zorrito Minerals supplier dossier project.

This app is intentionally conservative with facts. Source-backed content is kept in `src/data/dashboard.ts`; missing or unresolved facts stay marked as `PENDING`, `REQUIRED`, or `TO CONFIRM`.

## Tech Stack

- React + TypeScript
- Vite
- HashRouter for GitHub Pages-friendly routing
- Static assets served from `public/source-data/`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the Vite app and publishes `dist/` with GitHub Pages. In GitHub, set Pages source to **GitHub Actions**.

## Source Material

Original handoff files remain in `source-data/`. Browser-served copies live in `public/source-data/` so PDFs, Markdown, and images can be opened from the app.

The current brand styling is based on evidenced colors and typography from the Zorrito website screenshot, not a formal approved brand guide.
