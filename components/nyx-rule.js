// NYX Rule — animated horizontal rule drawing on intersection
// <nyx-rule></nyx-rule> ou <nyx-rule color="cyan"></nyx-rule>

class NyxRule extends HTMLElement {
  connectedCallback() {
    this.render();
    this.observe();
  }
  render() {
    const color = this.getAttribute('color') || 'cyan';
    this.innerHTML = `<span class="nyx-rule-fill nyx-rule-fill--${color}"></span>`;
  }
  observe() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          this.classList.add('in');
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(this);
  }
}

if (!customElements.get('nyx-rule')) customElements.define('nyx-rule', NyxRule);
