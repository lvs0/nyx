# NYX

> *« Cinq produits. Une seule souveraineté. »*

NYX est un écosystème de souveraineté numérique.

| | URL |
|--|----|
| **Site écosystème** | https://lvs0.github.io/nyx/ |
| **Roadmap** | https://lvs0.github.io/nyx/roadmap.html |
| **Nyx-Browser (concept)** | https://lvs0.github.io/nyx/browser.html |
| **Simulateur Symbiote** | https://lvs0.github.io/symbiote/ |
| **Vortex Engine** | https://github.com/lvs0/vortex |

## Brand

Voir [brand/BRAND-BOOK.md](./brand/BRAND-BOOK.md) et [ECOSYSTEM.md](./ECOSYSTEM.md).

## Developper quickstart

```bash
git clone https://github.com/lvs0/nyx
cd nyx
python3 -m http.server 8000
# → http://localhost:8000
```

## Components (Web)

- `<nyx-logo>` — Logo SVG natif, attributs `size variant theme`
- `<nyx-modal>` — Modale projet avec 5 fiches préchargées
- `<nyx-button>` — Boutons variants primary/ghost/electric
- `<nyx-stat>` — Compteur animé, IntersectionObserver
- `<nyx-rule>` — Ligne animée draw-on-scroll

```html
<script src="https://lvs0.github.io/nyx/components/nyx-logo.js"></script>
<nyx-logo size="48" theme="cyan"></nyx-logo>
```

## Tokens

[brand/tokens.css](./brand/tokens.css) — 200+ variables CSS:
- Couleurs (`--nyx-cyan`, `--nyx-magenta`, `--nyx-violet`, ...)
- Typographie (`--nyx-font-display`, `--nyx-font-mono`)
- Motion (`--nyx-easing-soft`, `--nyx-dur-base`)
- Espacement (`--nyx-space-1` → `--nyx-space-11`)

## Auteur

Lévy & Zoe · 12 juin 2026 · MIT
