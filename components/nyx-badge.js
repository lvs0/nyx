// NYX Badge — Custom Element de badge de statut
// <nyx-badge status="shipped|in-progress|future|concept|unknown|wip" label="...">
// Utilise les tokens NYX : --nyx-cyan, --nyx-violet, --nyx-amber, --nyx-magenta
// Zéro dépendance. Compatible tout navigateur moderne.

class NyxBadge extends HTMLElement {
  static get observedAttributes() { return ['status', 'label']; }

  connectedCallback() { this.render(); }

  attributeChangedCallback() { this.render(); }

  render() {
    const status = this.getAttribute('status') || 'unknown';
    const label  = this.getAttribute('label')  || this.textContent.trim();

    this.setAttribute('aria-label', label);
    this.className = `nyx-badge nyx-badge--${status}`;
    this.textContent = label;

    // Import des styles si pas déjà présents (auto-load)
    if (!document.getElementById('nyx-badge-styles')) {
      const s = document.createElement('style');
      s.id = 'nyx-badge-styles';
      s.textContent = `
        .nyx-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 3px;
          font-family: var(--nyx-font-sans, sans-serif);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          line-height: 1.4;
          white-space: nowrap;
        }
        .nyx-badge--shipped     { background: var(--nyx-cyan,    #00f5d4); color: var(--nyx-void,  #05060a); }
        .nyx-badge--in-progress{ background: var(--nyx-violet, #9d4edd); color: var(--nyx-snow,  #e7ebf5); animation: nyx-pulse 1.4s infinite; }
        .nyx-badge--future     { background: var(--nyx-amber,  #fcbf49); color: var(--nyx-void,  #05060a); }
        .nyx-badge--concept    { background: var(--nyx-violet, #9d4edd); color: var(--nyx-snow,  #e7ebf5); opacity: 0.75; }
        .nyx-badge--unknown    { background: var(--nyx-magenta,#ff3d8c); color: var(--nyx-void,  #05060a); animation: nyx-pulse 1.8s infinite; }
        .nyx-badge--wip        { background: var(--nyx-mist,   #444c63); color: var(--nyx-snow,  #e7ebf5); }
      `;
      document.head.appendChild(s);
    }
  }
}

if (!customElements.get('nyx-badge')) {
  customElements.define('nyx-badge', NyxBadge);
}