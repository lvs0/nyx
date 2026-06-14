# NYX Components

Web Components réutilisables dans toute la chaîne NYX. Zéro dépendance.

## `<nyx-badge>`

Badge de statut réutilisable. Utilise les tokens NYX.

### Usage

```html
<script src="https://lvs0.github.io/nyx/components/nyx-badge.js"></script>

<nyx-badge status="shipped"      label="SHIPPED"></nyx-badge>
<nyx-badge status="in-progress"   label="EN COURS"></nyx-badge>
<nyx-badge status="concept"       label="CONCEPT"></nyx-badge>
<nyx-badge status="future"       label="EN VUE"></nyx-badge>
<nyx-badge status="unknown"       label="À INVENTER"></nyx-badge>
<nyx-badge status="wip"          label="EN TRAVAUX"></nyx-badge>
```

### Attributs

| Attribut   | Valeurs                                       | Default    | Effet                      |
|------------|-----------------------------------------------|------------|----------------------------|
| `status`   | `shipped` \\| `in-progress` \\| `concept` \\| `future` \\| `unknown` \\| `wip` | `unknown` | Couleur + animation |
| `label`    | texte libre                                   | —          | Texte affiché dans le badge |

### Notes techniques

- Auto-charge ses styles dans `<head>` à la première instanciation (0 config).
- Tokens utilisés : `--nyx-cyan`, `--nyx-violet`, `--nyx-amber`, `--nyx-magenta`, `--nyx-mist`.
- Animation pulse sur `in-progress` et `unknown` — reprend `nyx-pulse` du brand system.
- Accessibilité : `aria-label` sur l'élément racine.

---

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

| Attribut  | Valeurs                                       | Default     | Effet                     |
|-----------|-----------------------------------------------|-------------|---------------------------|
| `size`    | nombre px                                     | `48`        | Hauteur du SVG            |
| `variant` | `mark` \\| `horizontal`                        | `horizontal`| Mark seul ou logo complet  |
| `theme`   | `default` \\| `cyan` \\| `violet` \\| `mono` | `default`   | Variation de gradient      |

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

---

## Roadmap composants

- `<nyx-card>` : carte produit avec hover gradient sweep.
- `<nyx-button variant="electric">` : bouton shimmer.
- `<nyx-stat-counter>` : animation count-up.
- `<nyx-rule>` : ligne-séparateur animée au scroll.
- `<nyx-toc>` : table des matières latérale sticky.