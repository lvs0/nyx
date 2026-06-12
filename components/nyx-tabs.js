// NYX Tabs — Custom Element with keyboard navigation (ARIA-COMPLIANT)
// <nyx-tabs>
//   <button slot="tab" data-target="a">Tab 1</button>
//   <button slot="tab" data-target="b">Tab 2</button>
//   <div slot="panel" data-id="a">Panel A</div>
//   <div slot="panel" data-id="b">Panel B</div>
// </nyx-tabs>

class NyxTabs extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'tablist');
    this.render();
  }

  render() {
    const tabs = Array.from(this.querySelectorAll('[slot="tab"]'));
    const panels = Array.from(this.querySelectorAll('[slot="panel"]'));

    // ARIA
    tabs.forEach((t, i) => {
      t.setAttribute('role', 'tab');
      t.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      t.setAttribute('tabindex', i === 0 ? '0' : '-1');
      t.classList.add('nyx-tab');
      t.addEventListener('click', () => this.activate(i));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          this.activate((i + 1) % tabs.length);
          tabs[(i + 1) % tabs.length].focus();
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          this.activate((i - 1 + tabs.length) % tabs.length);
          tabs[(i - 1 + tabs.length) % tabs.length].focus();
        }
      });
    });

    panels.forEach((p, i) => {
      p.setAttribute('role', 'tabpanel');
      p.classList.add('nyx-tab-panel');
      p.classList.toggle('is-active', i === 0);
    });

    this.classList.add('nyx-tabs-root');
  }

  activate(i) {
    const tabs = Array.from(this.querySelectorAll('[slot="tab"]'));
    const panels = Array.from(this.querySelectorAll('[slot="panel"]'));
    tabs.forEach((t, j) => {
      const active = i === j;
      t.setAttribute('aria-selected', active ? 'true' : 'false');
      t.setAttribute('tabindex', active ? '0' : '-1');
      t.classList.toggle('is-active', active);
    });
    panels.forEach((p, j) => p.classList.toggle('is-active', i === j));
  }
}

if (!customElements.get('nyx-tabs')) customElements.define('nyx-tabs', NyxTabs);
