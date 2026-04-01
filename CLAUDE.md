# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional website for a French sophrologist at lasophrologiepasapas.fr. Built with Angular 18 (SSR), backed by Google Cloud Functions, and deployed via GitHub Actions to Cloud Run.

## Development Commands

All commands run from the `website/` directory:

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build with SSR
npm run watch      # Rebuild on file changes (dev config)
npm test           # Unit tests via Karma/Jasmine
npm run serve:ssr:website  # Run the SSR build locally
```

## Architecture

### Repository Structure

```
website/          # Angular 18 frontend (main work happens here)
cloud-function/   # Google Cloud Functions (Node.js)
  contact-form/   # Email handler: validates reCAPTCHA, sends mail via nodemailer
  get-reviews/    # HTTP endpoint to fetch cached reviews
  reviews-fetcher/ # Background job to populate review cache
.github/workflows/ # CI/CD: push to main auto-deploys via Docker → Cloud Run
```

### Frontend (`website/src/app/`)

Each page is a standalone component/folder (`home-page/`, `contact-page/`, `tarifs-page/`, `qui-suis-je-page/`, `seances-page/`, `seniors-page/`, `entreprises-page/`, etc.). Shared infrastructure:

- `app-routing.module.ts` — route definitions
- `menu/` and `footer/` — global navigation/footer
- `content-layout/` — layout wrapper used by pages
- `title.service.ts` — sets `<title>` per route
- `axeptio.service.ts` — cookie consent integration (Axeptio widget)
- `toast/` — toast notification component

Styling uses Bootstrap 5 + ng-bootstrap for UI components, custom SCSS in `src/style/` for shared variables/utilities, and OpenLayers (`ol`) for any map display.

### SSR & Build

- `server.ts` — Express server entry point for SSR
- `main.server.ts` — Angular SSR bootstrap
- `Dockerfile` — multi-stage build; final image runs `node dist/website/server/server.mjs` on port 4000
- Deployment: GitHub Actions builds Docker image → pushes to Google Artifact Registry → deploys to Cloud Run (triggered on push to `main`)

### Cloud Functions

`cloud-function/contact-form/index.js` exports `sendMail`: validates reCAPTCHA Enterprise token, then sends email via nodemailer. Secrets (SMTP credentials, reCAPTCHA keys) are injected as environment variables at deploy time via GitHub Actions secrets.

## Key Dependencies

- `@angular/ssr` — server-side rendering
- `ng-bootstrap` + `bootstrap` — UI components
- `ol` — OpenLayers map
- `@google-cloud/recaptcha-enterprise` — spam protection
- `nodemailer` — email dispatch (Cloud Function only)
