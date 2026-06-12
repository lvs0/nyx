// NYX Stat — animated count-up + formatting
// <nyx-stat label="latence" value="2.4" unit="ms" decimals="1"></nyx-stat>

class NyxStat extends HTMLElement {
  connectedCallback() { this.render(); this.observe(); }
  render() {
    const label = this.getAttribute('label') || '';
    const value = parseFloat(this.getAttribute('value') || '0');
    const unit = this.getAttribute('unit') || '';
    const decimals = parseInt(this.getAttribute('decimals') || '1', 10);
    const duration = parseInt(this.getAttribute('duration') || '1200', 10);

    this.innerHTML = `
      <div class="nyx-stat-slot">
        <div class="nyx-stat-value-wrap">
          <span class="nyx-stat-value" data-target="${value}" data-decimals="${decimals}">0</span><span class="nyx-stat-unit">${unit}</span>
        </div>
        <span class="nyx-stat-label">${label}</span>
      </div>
    `;
    this._target = value;
    this._decimals = decimals;
    this._duration = duration;
  }
  observe() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          this.animate();
          io.disconnect();
        }
      });
    }, { threshold: 0.3 });
    io.observe(this);
  }
  animate() {
    const span = this.querySelector('.nyx-stat-value');
    if (!span) return;
    const target = this._target;
    const decimals = this._decimals;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / this._duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      span.textContent = cur.toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
      else span.textContent = target.toFixed(decimals);
    };
    requestAnimationFrame(tick);
  }
}

if (!customElements.get('nyx-stat')) customElements.define('nyx-stat', NyxStat);
