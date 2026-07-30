<div align="center">

# cv.itslouis.dev

[![Made with Vue](https://img.shields.io/badge/Made%20with-Vue-42B883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Deployed on Cloudflare](https://img.shields.io/badge/Deployed%20on-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://www.cloudflare.com)

My online CV - a fast, accessible overview of my experience, skills, and projects.

Live at **[cv.itslouis.dev](https://cv.itslouis.dev)**.

[Stack](#stack) • [Quick Start](#quick-start) • [Scripts](#scripts) • [Deployment](#deployment)

</div>

## Stack

- **[Vue 3](https://vuejs.org)** - reactive user interface built with the Composition API
- **[TypeScript](https://www.typescriptlang.org)** - type-safe application code
- **[Vite](https://vite.dev)** - development server and production build tooling
- **[Tailwind CSS 4](https://tailwindcss.com)** - utility-first styling compiled through the Vite plugin
- **[Lucide](https://lucide.dev)** - interface icons
- **[Cloudflare Workers](https://workers.cloudflare.com)** - static asset hosting and deployment

The CV content is based on my public [JSON Resume](https://gist.github.com/itsmelouis/9e1747cc5b704021a9af1eea5590a750), and the interface follows the design system of [itslouis.dev](https://itslouis.dev).

## Quick Start

This project requires [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io).

Install the dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

## Scripts

```bash
pnpm dev              # Start the development server
pnpm build            # Type-check and build for production
pnpm preview          # Preview the production build locally
pnpm deploy:dry-run   # Build and validate the Cloudflare deployment
pnpm deploy           # Build and deploy to Cloudflare
```

## Deployment

The site runs as a Cloudflare Worker with static assets and the custom `cv.itslouis.dev` domain.

Authenticate with Cloudflare, validate the deployment, and deploy the site:

```bash
npx wrangler login
pnpm deploy:dry-run
pnpm deploy
```

Security and cache headers are defined in [`public/_headers`](./public/_headers).

The production stylesheet is minified and content-aware. Tailwind scans only `src/**/*.vue`, omits unused utilities and Preflight, and emits a single hashed CSS asset.
