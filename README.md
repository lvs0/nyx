# NYX — écosystème

> *« Cinq produits. Une seule souveraineté. »*

NYX est le **fleuve de marque** qui regroupe les produits de l'écosystème :

```
nyx/
├── brand/            Tokens, logos, brand book
│   ├── tokens.css    Le fichier à importer dans TOUS les produits
│   ├── logo-mark.svg
│   ├── logo-horizontal.svg
│   └── BRAND-BOOK.md Les règles d'usage
├── site/             Le site écosystème (3D hero + 5 produits)
│   ├── index.html
│   ├── site.css
│   └── site.js
├── components/       (à venir) Web Components réutilisables
├── docs/             R&D, RFCs, journal
└── assets/           Fontières, sons, illustrations
```

## Produits de l'écosystème

| # | Produit | Statut | Mission |
|---|---------|--------|---------|
| 01 | **Vortex** | ✅ public [repo](https://github.com/lvs0/vortex) | Patch Windows bas-niveau. Rust + NSIS. |
| 02 | **Symbiote** | ✅ public [repo](https://github.com/lvs0/symbiote) | Simulateur 3D hardware. 4 prototypes. |
| 03 | **Aegis** | ⚙ préparation | Cloud chiffré post-quantique (Polygone). |
| 04 | **Nyx-IA** | ⚙ préparation | IA locale, souverain, no API tierce. |
| 05 | **Nyx-Browser** | 💡 concept | Navigateur privacy-by-design. |
| 06 | _Sixième?_ | 💡 à inventer | Nous cherchons. |

## Quickstart

```bash
git clone https://github.com/lvs0/nyx
cd nyx/site
python3 -m http.server 8765
# → http://localhost:8765
```

Ou ouvre simplement `site/index.html` dans un navigateur.

## Importer les tokens dans ton projet

```html
<link rel="stylesheet" href="https://unpkg.com/nyx/brand/tokens.css" />
```

Tu obtiens `:root` avec : `--nyx-*` couleurs, typo, motion, spacing. Utilisable tel quel ou forké.

## Manifest

NYX n'est pas un produit, c'est un **écosystème**. La règle&nbsp;: chaque produit doit avoir
- data user-owned,
- code open-source,
- animations niveau brik.space (sobres mais vivantes),
- une cohérence de marque stricte (NYX tokens).

## Auteur

Lévy & Zoe — 12 juin 2026 — MIT.
