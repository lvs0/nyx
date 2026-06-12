// NYX Modal — opens project detail with kinetic typography & 3D card flip.
// Usage: openNyxModal({ id, name, tagline, description, features, links, stats })

(function () {
  if (window.NyxModal) return;

  const PROJECTS = {
    vortex: {
      id: 'vortex',
      tag: '01 · OS',
      name: 'Vortex',
      subtitle: 'Patch Windows natif',
      description:
        "Un binaire Rust qui repense le pipeline OS sans le réinstaller. Memory integrity, GPU scheduling, paging adaptatif, Nagle désactivé, working-set trim. Pas de daemon, pas d'abonnement, pas de MITM.",
      features: [
        'Moteur Rust natif (Win32 API + PowerShell)',
        'Mode `apply` / `restore` automatique',
        'Backup registre avant chaque modif',
        'NSIS installer ou portable 7z SFX',
        'Compatible Windows 11 (et 10 fallback)',
      ],
      links: [
        { label: 'Voir sur GitHub', href: 'https://github.com/lvs0/vortex' },
        { label: 'Aperçu rapide', href: '#vortex-card' },
      ],
      stats: {
        Stack: 'Rust 1.95 · windows-rs 0.58',
        Taille: '~6 Mo installé',
        Cible: 'Win 11 + 16 Go RAM',
        Statut: 'Public · MIT',
      },
    },
    symbiote: {
      id: 'symbiote',
      tag: '02 · Simulation',
      name: 'Symbiote',
      subtitle: 'Simulateur 3D matériel',
      description:
        "Quatre prototypes de l'ère simbiotique en WebGL : plaque de silicium vivante, maillage décentralisé, HBM 3D + TMFC, architecture neuromorphique. Bouge les curseurs matériel et regarde la latence tomber.",
      features: [
        '4 architectures quantifiées',
        'Curseurs matériel temps réel',
        'Métriques : latence, parallélisme, TFLOPs, efficience',
        'Three.js + UnrealBloomPass (WebGL)',
        'Aucune dépendance build',
      ],
      links: [
        { label: 'Lancer la simulation', href: 'https://lvs0.github.io/symbiote/' },
        { label: 'Voir sur GitHub', href: 'https://github.com/lvs0/symbiote' },
      ],
      stats: {
        Stack: 'JS vanilla + Three.js 0.165',
        Engines: 'WebGL 2 requis',
        Lignes: '~600 lignes',
        Statut: 'Public · MIT',
      },
    },
    aegis: {
      id: 'aegis',
      tag: '03 · Cloud',
      name: 'Aegis',
      subtitle: 'Cloud chiffré post-quantique',
      description:
        "Un cloud où tes fichiers n'existent qu'à toi. Chiffrement bout-en-bout avec ML-KEM-1024 (issu Polygone), Shamir secret sharing 4/7, zero-knowledge côté serveur. Même nous, on ne peut rien lire.",
      features: [
        'Post-quantique (CRYSTALS-Kyber)',
        'Shamir 4/7 fragmentation',
        'AES-256-GCM payload',
        'Zero-knowledge serveurs',
        'Sync POSIX/Windows natif',
      ],
      links: [
        { label: 'Roadmap Polygone', href: 'https://github.com/lvs0/polygone' },
        { label: 'Whitepaper (à venir)', href: '#' },
      ],
      stats: {
        Stack: 'Rust + WASM crypto',
        Quantique: 'ML-KEM-1024',
        Partage: 'Shamir 4/7',
        Statut: 'En conception',
      },
    },
    nyxia: {
      id: 'nyxia',
      tag: '04 · Assistant',
      name: 'Nyx-IA',
      subtitle: 'IA locale souveraine',
      description:
        "Une IA qui te ressemble parce qu'elle tourne chez toi. Pas d'API distante, pas de telemetry, pas de \"amélioration par vos données\". Tu choisis le modèle, ou tu en importa un.",
      features: [
        'Multi-modèles : Llama 3.3, Qwen3, Mistral, Nemotron',
        'Inference locale (vLLM, llama.cpp)',
        'Mémoire chiffrée user-side',
        'Aucun upload de prompt par défaut',
        'Hot-swap modèle à chaud',
      ],
      links: [
        { label: 'Roadmap', href: '#' },
        { label: 'Skills Hermes compatibles', href: '#' },
      ],
      stats: {
        Cible: 'NVIDIA · AMD · Apple Silicon',
        Modèles: 'Open-source uniquement',
        RAM: '16 Go minimum recommandé',
        Statut: 'Recherche',
      },
    },
    browser: {
      id: 'browser',
      tag: '05 · Navigation',
      name: 'Nyx-Browser',
      subtitle: 'Web comme medium, pas piège',
      description:
        "Un navigateur qui ne te profile pas. Pas de cookies tiers par défaut, pas de fingerprint, pas de pré-chargement caché. Tu surfes ce que tu demandes, point.",
      features: [
        'Blocage cookies tiers natif',
        'Anti-fingerprint passif',
        'Isolation de profil par onglet',
        'Profil unique exportable',
        'Pas de telemetry',
      ],
      links: [
        { label: 'Manifeste privacy', href: '#vision' },
        { label: 'Aperçu UI (à venir)', href: '#' },
      ],
      stats: {
        Engine: 'Chromium forké',
        Tracking: 'Aucun par défaut',
        Profils: 'Multi-comptes isolés',
        Statut: 'Concept',
      },
    },
  };

  // ─────────────── Injecter le DOM (backdrop + modal host) ───────────────
  const backdrop = document.createElement('div');
  backdrop.className = 'nyx-modal-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  backdrop.innerHTML = `
    <div class="nyx-modal" role="dialog" aria-modal="true" aria-labelledby="nyx-modal-title" tabindex="-1">
      <button class="nyx-modal-close" type="button" aria-label="Fermer">×</button>
      <span class="nyx-modal-tag" data-field="tag"></span>
      <h2 class="nyx-modal-title" data-field="name" id="nyx-modal-title"></h2>
      <p class="nyx-modal-subtitle" data-field="subtitle"></p>
      <p class="nyx-modal-description" data-field="description"></p>
      <ul class="nyx-modal-features" data-field="features"></ul>
      <div class="nyx-modal-stats" data-field="stats"></div>
      <div class="nyx-modal-actions" data-field="actions"></div>
    </div>`;

  function ensureMounted() {
    if (!backdrop.parentNode) document.body.appendChild(backdrop);
    return backdrop.querySelector('.nyx-modal');
  }

  const modal = ensureMounted();
  const fields = {
    tag: backdrop.querySelector('[data-field="tag"]'),
    name: backdrop.querySelector('[data-field="name"]'),
    subtitle: backdrop.querySelector('[data-field="subtitle"]'),
    description: backdrop.querySelector('[data-field="description"]'),
    features: backdrop.querySelector('[data-field="features"]'),
    stats: backdrop.querySelector('[data-field="stats"]'),
    actions: backdrop.querySelector('[data-field="actions"]'),
  };

  // Close interactions
  backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
  backdrop.querySelector('.nyx-modal-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) close();
  });

  function open(idOrProject) {
    const project = typeof idOrProject === 'string'
      ? PROJECTS[idOrProject]
      : idOrProject;
    if (!project) return;

    fields.tag.textContent = project.tag;
    fields.name.textContent = project.name;
    fields.subtitle.textContent = project.subtitle;
    fields.description.textContent = project.description;

    fields.features.innerHTML = project.features
      .map((f) => `<li>${escapeHtml(f)}</li>`).join('');
    fields.stats.innerHTML = Object.entries(project.stats)
      .map(([k, v]) => `<div><label>${escapeHtml(k)}</label><b>${escapeHtml(v)}</b></div>`)
      .join('');
    fields.actions.innerHTML = project.links
      .map(
        (l) => `<a class="btn btn--${l.primary ? 'primary' : 'ghost'}" href="${escapeHtml(l.href)}" ${l.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(l.label)}</a>`
      )
      .join('');

    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.classList.add('nyx-modal-open');
    modal.focus({ preventScroll: true });
  }

  function close() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    document.body.classList.remove('nyx-modal-open');
  }

  function escapeHtml(s) {
    const amp = String.fromCharCode(38);
    const lt  = String.fromCharCode(60);
    const gt  = String.fromCharCode(62);
    const q   = String.fromCharCode(34);
    const ap  = String.fromCharCode(39);
    return String(s)
      .replace(/&/g, amp + "amp;")
      .replace(/</g, amp + "lt;")
      .replace(/>/g, amp + "gt;")
      .replace(/"/g, amp + "quot;")
      .replace(/'/g, amp + "#39;");
  }

  window.NyxModal = { open, close, projects: PROJECTS };
})();
