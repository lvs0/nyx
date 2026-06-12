# NYX — Brand Book v0.1

> *« La nuit n'est pas l'absence de lumière. C'est la lumière qu'on ne voit pas encore. »*

NYX est la marque-fleuve qui regroupe les produits de l'écosystème : **Vortex** (OS), **Symbiote** (3D), **Aegis** (cloud chiffré), **Nyx-IA** (assistant), **Nyx-Browser** (UI).

## 1. Pourquoi NYX

- **Nyx** : déesse grecque de la nuit, mère du Jour et de l'Aurore — pas opposée à la lumière, elle l'a *enfantée*.
- Prononciation : *nix*.
- Promesse : **on ne te montre pas tout, mais ce qu'on te montre compte**. Sobriété cinétique, jamais muet, jamais criard.

## 2. Token stack

| Token group | Fichier | Usage |
|-------------|---------|-------|
| Palette | `tokens.css` `--nyx-*` | Tous les produits |
| Typographie | Fraunces (display) + Space Grotesk (sans) + JetBrains Mono (mono) | Hero, body, code |
| Motion | `--nyx-easing-*`, `--nyx-dur-*` | Toutes transitions JS/CSS |
| Logo | `logo-mark.svg`, `logo-horizontal.svg` | Sites, packaging, app icon |

## 3. Palette

| Token | Hex | Role |
|-------|-----|------|
| `--nyx-void` | `#05060a` | Background principal |
| `--nyx-ink` | `#0b0d14` | Surface élevée 1 |
| `--nyx-graphite` | `#151925` | Surface élevée 2 |
| `--nyx-slate` | `#232938` | Hover |
| `--nyx-mist` | `#444c63` | Bordures thin |
| `--nyx-bone` | `#b3b9cb` | Texte secondaire |
| `--nyx-snow` | `#e7ebf5` | Texte principal |
| `--nyx-cyan` | `#00f5d4` | Action primaire, signal |
| `--nyx-magenta` | `#ff3d8c` | Alerte, focus |
| `--nyx-violet` | `#9d4edd` | Data, IA |
| `--nyx-amber` | `#fcbf49` | Warning, hardware |

## 4. Gradient signature

```
linear-gradient(135deg, #00f5d4 0%, #9d4edd 50%, #ff3d8c 100%)
```

Utilisé pour : le wordmark, les boutons "électriques", les accents mis en lumière, les callouts IA.

## 5. Typographie

- **Display** : Fraunces (300) pour hero & subtitres — élégance serif sans poids.
- **Sans** : Space Grotesk (400/500/700) pour UI.
- **Mono** : JetBrains Mono (400/700) pour labels, code, signatures de modules.

Hiérarchie :

| Niveau | Token | Usage |
|--------|-------|-------|
| Hero | 48 → 96 px | Landing uniquement |
| H1 | 36 → 64 px | Sections principales |
| H2 | 28 → 44 px | Sous-sections |
| H3 | 22 → 30 px | Cards |
| Lede | 18 px | Sous-hero |
| Body | 16 px | Texte courant |
| Small | 13 px | Captions, méta |
| Tag | 11 px uppercase tracking 0.18em | Labels de section |

## 6. Motion — la motion est le langage

NYX bouge comme un *système vivant* :

- **Micro-interactions** (button hover, card hover, link underline) : 180 ms `ease-soft`
- **Section transitions** (reveal-in, scroll-into) : 360 ms `ease-soft`
- **Hero animations** (text mask, particle drift) : 720 à 1400 ms `ease-soft`
- **Spring looms** : stiffness 220, damping 24
- **Loopers** : `nyx-pulse` 1.4 s, `nyx-drift` 6 s

**Règle absolue** : un élément qui apparaît doit *venir de quelque part* (translate-Y + opacity, ou scale-from-zero). Jamais pop-in brutal.

## 7. Logo usage

- **Mark** (cercle) — minimum 24 px, doit toujours avoir un radius de protection = 25 % de la taille.
- **Wordmark** (mark + NYX letterform) — minimum 100 px de large.
- **Ne jamais** : étirer le mark, le placer sur fond sans contraste, ni changer les couleurs du gradient.

## 8. Voix

- Français (par défaut). Verbes simples. Phrases courtes.
- Ton direct, dense, jamais pédant. Pas d'exclamation. Pas d'emoji en masse.
- Toujours dire *ce qu'on sait* et *ce qu'on ne sait pas*.
- L'utilisateur est *un pair*, pas un client.

## 9. Produits de l'écosystème

| Produit | Domaine | Mission |
|---------|---------|---------|
| **Vortex** | OS / Système | Reparler le PC dans sa langue (Win32, registre, scheduler) |
| **Symbiote** | Simulation 3D | Voir 4 prototypes matériels de l'ère symbiotique |
| **Aegis** | Cloud chiffré | Données user-owned, ML-KEM-1024 (issu Polygone) |
| **Nyx-IA** | Assistant | IA locale, souveraine, chiffrée user-side |
| **Nyx-Browser** | UI / navigation | Navigateur comme medium, pas comme piège |

## 10. Open source, open brand

`tokens.css` est **public**. Tu peux l'utiliser tel quel, le forker, le renommer — il reste NYX. Mais le wordmark et le mark sont des signatures : ne les change pas sans escale.

— Zoe & Lévy, 12 juin 2026.
