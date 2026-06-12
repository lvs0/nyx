# NYX Components

Web Components réutilisables dans toute la chaîne NYX.

## `<nyx-logo>`

Affiche le logo NYX en SVG natif. Pas de sprite, pas d'image — pure balise.

```html
<script src="https://lvs0.github.io/nyx/components/nyx-logo.html"></script>

<nyx-logo size="48"></nyx-logo>
<nyx-logo size="64" variant="mark"></nyx-logo>
<nyx-logo size="120" theme="cyan"></nyx-logo>
<nyx-logo size="160" theme="violet"></nyx-logo>
```

### Attributs

| Attribut | Valeurs | Default | Effet |
|----------|---------|---------|-------|
| `size`   | nombre px | `48` | Hauteur du SVG |
| `variant`| `mark` \| `horizontal` | `horizontal` | Mark seul ou logo complet |
| `theme`  | `default` \| `cyan` \| `violet` | `default` | Variation de gradient |

### Notes techniques

- Défini via `customElements.define('nyx-logo', ...)`.
- Le gradient est généré à chaque instance (pas mutuellement partagé), ce qui permet l'isolation des instances.
- 0 dépendance, 0 framework. Compatible tout navigateur moderne.

## Roadmap

- `<nyx-card>` : carte produit avec hover gradient sweep.
- `<nyx-button variant="electric">` : bouton shimmer.
- `<nyx-stat-counter>` : animation count-up.
