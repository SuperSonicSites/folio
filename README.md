# Folio — Client Brief Studio

A markdown-first client briefing tool built with Astro + Cloudflare. Store client briefs as `.md` files in GitHub, edit them in a beautiful Scrivener-like UI.

## Features

- **Markdown-based briefs** — briefs stored as `.md` files in GitHub
- **Live editing** — clean, minimal UI with dark/light modes
- **GitHub integration** — save/load directly from repo
- **Astro + Cloudflare** — fast, serverless deployment
- **Type-safe** — TypeScript throughout

## Setup

### Prerequisites

- Node.js 18+
- GitHub token (Personal Access Token with `repo` scope)
- Cloudflare account (free tier fine)

### Local Development

1. **Clone & install:**
   ```bash
   git clone https://github.com/SuperSonicSites/folio.git
   cd folio
   npm install
   ```

2. **Create `.env.local`:**
   ```
   GITHUB_TOKEN=ghp_xxxxx
   GITHUB_REPO=SuperSonicSites/folio
   ```

3. **Run dev server:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:3000`

## Usage

1. **New client** — Click "+ New Client" and enter a name
2. **Edit brief** — Use markdown format (see template)
3. **Save** — Clicks "Save Brief" to commit to GitHub
4. **Load** — Click a client name to load their brief

## Brief Template

```markdown
## About the Client

- **Name:** 
- **Business Name:** 
- **Website Email:** 
- **Website Phone Number:** 
- **Industry:** 
- **Ideal Client:** 

## Brand Identity

- **Logo:** 
- **Image Folder:** 
- **Important Comments:** 

## Services

### List of Services or Products

- 
- 
- 

### Important Information
```

## Deployment to Cloudflare Pages

1. Connect GitHub repo to Cloudflare Pages
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables:
   - `GITHUB_TOKEN`
   - `GITHUB_REPO`

## Architecture

```
src/
├── pages/
│   ├── index.astro         → UI (HTML/CSS/JS)
│   └── api/
│       ├── clients.ts      → List clients from GitHub
│       ├── load.ts         → Load a brief
│       └── save.ts         → Save a brief to GitHub
├── lib/
│   └── github.ts           → GitHub API utilities
└── styles/
    └── (shared styles in index.astro for now)
```

## API Endpoints

- `GET /api/clients` — List all client briefs
- `GET /api/load?client=NAME` — Load a specific brief
- `POST /api/save` — Save a brief (body: `{ client, content }`)

## Design

- **Typography** — Crimson Text (body), Founders Grotesk (headers)
- **Dark/Light modes** — Toggle in sidebar
- **Minimal UI** — Scrivener-meets-Apple aesthetic
- **Responsive** — Works on desktop, tablet

## Next Steps

This tool is the **foundation** for website generation. Once a brief is approved, it feeds into builder.io for site creation.

---

Made with ⚡ for SuperSonicSites
