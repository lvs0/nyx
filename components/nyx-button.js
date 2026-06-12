// NYX Button — Custom Element
// <nyx-button variant="primary|ghost|electric" href="...">Label</nyx-button>
// <nyx-button onclick="alert('hi')">No href</nyx-button>

class NyxButton extends HTMLElement {
  static get observedAttributes() { return ['variant', 'href', 'target', 'rel', 'type', 'disabled']; }
  connectedCallback() { this.render(); this.upgradeClicks(); }
  attributeChangedCallback() { if (this.isConnected) { this.render(); this.upgradeClicks(); } }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const href = this.getAttribute('href');
    this.classList.add('nyx-btn', `nyx-btn--${variant}`);
    if (this.hasAttribute('disabled')) this.classList.add('is-disabled');
    if (!this.querySelector('a, button')) {
      // Slot content
      const slot = document.createElement('slot');
      this.innerHTML = '';
      this.appendChild(slot);
    }
  }

  upgradeClicks() {
    const variant = this.getAttribute('variant') || 'primary';
    if (this.hasAttribute('disabled')) return;
    if (!this.style.cursor) this.style.cursor = 'pointer';
    this.onclick = (e) => {
      const href = this.getAttribute('href');
      const type = this.getAttribute('type');
      if (type === 'submit') {
        const form = this.closest('form');
        if (form) form.submit();
        return;
      }
      if (href) {
        if (this.getAttribute('target') === '_blank') {
          window.open(href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = href;
        }
      }
    };
  }
}

if (!customElements.get('nyx-button')) customElements.define('nyx-button', NyxButton);
