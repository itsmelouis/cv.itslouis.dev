# cv.itslouis.dev

CV web de Louis Floquet, développé avec Vue 3, TypeScript et Vite.

Le contenu est basé sur le [JSON Resume public](https://gist.github.com/itsmelouis/9e1747cc5b704021a9af1eea5590a750) et l’interface reprend le design system de [itslouis.dev](https://itslouis.dev).

## Développement

```bash
pnpm install
pnpm dev
```

## Production

```bash
pnpm build
pnpm preview
```

## Déploiement Cloudflare

Le site est déployé comme Worker avec assets statiques et le domaine personnalisé `cv.itslouis.dev`.

```bash
npx wrangler login
pnpm deploy:dry-run
pnpm deploy
```

Les en-têtes de sécurité et de cache sont définis dans `public/_headers`.
