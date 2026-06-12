# NYX Components

Web Components réutilisables dans toute la chaîne NYX. Zéro dépendance.

## `<nyx-logo>`

Affiche le logo NYX en SVG natif. Pas de sprite, pas d'image — pure balise.

### Usage

```html
<script src="https://lvs0.github.io/nyx/components/nyx-logo.js"></script>

<nyx-logo size="48"></nyx-logo>
<nyx-logo size="64" variant="mark"></nyx-logo>
<nyx-logo size="120" theme="cyan"></nyx-logo>
<nyx-logo size="160" theme="violet"></nyx-logo>
<nyx-logo size="48" theme="mono"></nyx-logo>
```

### Attributs

| Attribut | Valeurs | Default | Effet |
|----------|---------|---------|-------|
| `size`   | nombre px | `48` | Hauteur du SVG |
| `variant`| `mark` \| `horizontal` | `horizontal` | Mark seul ou logo complet |
| `theme`  | `default` \| `cyan` \| `violet` \| `mono` | `default` | Variation de gradient |

### Notes techniques

- Défini via `customElements.define('nyx-logo', ...)`.
- Le gradient est généré à chaque instance (pas mutuellement partagé), ce qui permet l'isolation des instances.
- 0 dépendance, 0 framework. Compatible tout navigateur moderne (Chrome 67+, Firefox 63+, Safari 10.1+).
- Accessibilité : `aria-label` + `role="img"` + texte alternatif possible via `<span slot="alt">`.

### Accessibilité

Les SVG incluent `aria-label` et `role="img"`. Si tu mets du texte dans le composant :

```html
<nyx-logo size="48">
  <span slot="alt">Nyx, l'écosystème</span>
</nyx-logo>
```

## Roadmap

- `<nyx-card>` : carte produit avec hover gradient sweep.
- `<nyx-button variant="electric">` : bouton shimmer.
- `<nyx-stat-counter>` : animation count-up.
- `<nyx-rule>` : ligne-séparateur animée au scroll.
