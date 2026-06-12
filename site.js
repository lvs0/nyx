// NYX — site ecosystem
// Gère : hero 3D, reveal on scroll, nav scrolled, kinetic type

(function() {
  'use strict';

  // ───────────── NAV SCROLLED ─────────────
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ───────────── SCROLL REVEAL ─────────────
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(el => {
      if (el.classList.contains('reveal-auto')) return;
      io.observe(el);
    });
  }

  // ───────────── HERO 3D ─────────────
  const cv = document.getElementById('hero-canvas');
  if (cv && window.THREE) heroInit(cv);

  function heroInit(canvas) {
    const parent = canvas.parentElement;
    const w = () => parent.clientWidth;
    const h = () => parent.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w()/h(), 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h(), false);

    // ───────── Monolithe principale : 5 produits en orbite ─────────
    const monolithe = new THREE.Group();
    scene.add(monolithe);

    // Core sphere (data core)
    const coreRadius = 0.55;
    const coreGeom = new THREE.IcosahedronGeometry(coreRadius, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x9d4edd, wireframe: true, transparent: true, opacity: 0.5
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    monolithe.add(core);

    // Inner glow
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(coreRadius * 0.7, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.18 })
    );
    monolithe.add(glow);

    // 5 satellites (les 5 produits NYX)
    const COLORS = [0x00f5d4, 0xff3d8c, 0x9d4edd, 0xfcbf49, 0x58ffe6];
    const NAMES = ['VORTEX', 'SYMBIOTE', 'AEGIS', 'NYX-IA', 'BROWSER'];
    const satellites = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const r = 2.4;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = Math.sin(angle * 2) * 0.4;

      const geom = new THREE.BoxGeometry(0.32, 0.32, 0.32);
      const mat = new THREE.MeshBasicMaterial({
        color: COLORS[i], transparent: true, opacity: 0.95
      });
      const m = new THREE.Mesh(geom, mat);
      m.position.set(x, y, z);
      m.userData = {
        baseAngle: angle,
        radius: r,
        height: y,
        phase: Math.random() * Math.PI * 2,
        name: NAMES[i]
      };
      monolithe.add(m);
      satellites.push(m);

      // Edges between monolithe and core
      const egeo = new THREE.BufferGeometry().setFromPoints([
        m.position.clone(), new THREE.Vector3(0,0,0)
      ]);
      const eline = new THREE.Line(
        egeo,
        new THREE.LineBasicMaterial({ color: COLORS[i], transparent: true, opacity: 0.4 })
      );
      monolithe.add(eline);
    }

    // Stars
    const starGeom = new THREE.BufferGeometry();
    const starsArr = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      starsArr[i*3] = (Math.random() - 0.5) * 40;
      starsArr[i*3+1] = (Math.random() - 0.5) * 40;
      starsArr[i*3+2] = (Math.random() - 0.5) * 30 - 5;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starsArr, 3));
    const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(starGeom, starsMat));

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    parent.addEventListener('pointermove', (e) => {
      const rect = parent.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    // ─── Raycaster pour les satellites ───
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const cvEl = canvas;
    function pickHit(clientX, clientY) {
      const rect = cvEl.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(satellites, false);
      return hits.length ? hits[0].object : null;
    }
    let hovered = null;
    canvas.style.cursor = 'grab';
    canvas.addEventListener('pointermove', (e) => {
      const hit = pickHit(e.clientX, e.clientY);
      if (hit !== hovered) {
        if (hovered) hovered.scale.setScalar(1);
        hovered = hit;
        if (hovered) hovered.scale.setScalar(1.5);
      }
      canvas.style.cursor = hit ? 'pointer' : 'grab';
    });
    canvas.addEventListener('click', (e) => {
      const hit = pickHit(e.clientX, e.clientY);
      if (hit && window.NyxModal) window.NyxModal.open(hit.userData.name.toLowerCase());
    });
    function animate(t) {
      requestAnimationFrame(animate);
      const time = t * 0.001;

      // Satellites orbit
      satellites.forEach((m, i) => {
        const ang = m.userData.baseAngle + time * 0.18 + i * 0.05;
        const r = m.userData.radius;
        const x = Math.cos(ang) * r;
        const z = Math.sin(ang) * r;
        m.position.x = x;
        m.position.z = z;
        m.position.y = Math.sin(time + m.userData.phase) * 0.3;
        // pulse scale
        const s = 1 + 0.18 * Math.sin(time * 1.4 + m.userData.phase);
        m.scale.setScalar(s);
        m.rotation.x = time * 0.5;
        m.rotation.y = time * 0.7;
      });

      // Core rotation
      core.rotation.x = time * 0.3;
      core.rotation.y = time * 0.2;
      glow.rotation.x = -time * 0.4;
      glow.rotation.y = time * 0.3;

      // Parallax
      scene.rotation.y += (mouseX * 0.4 - scene.rotation.y) * 0.04;
      scene.rotation.x += (-mouseY * 0.25 - scene.rotation.x) * 0.04;

      renderer.render(scene, camera);
    }
    animate(0);

    window.addEventListener('resize', () => {
      camera.aspect = w()/h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h(), false);
    });
  }

  // ───────────── ANIMATE KICKER (slight pulse) ─────────────
  document.querySelectorAll('.kicker').forEach(k => {
    k.style.animation = 'nyx-pulse 3s ease-in-out infinite';
  });

  // ───────────── HASH LINKS smooth ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ───────────── KINETIC TEXT: hero title stagger ─────────────
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const words = heroTitle.querySelectorAll('.nyx-italic-gradient');
    words.forEach((w, i) => {
      w.style.display = 'inline-block';
      w.style.opacity = '0';
      w.style.transform = 'translateY(20px) rotate(-2deg)';
      setTimeout(() => {
        w.style.transition = 'opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)';
        w.style.opacity = '1';
        w.style.transform = 'translateY(0) rotate(0)';
      }, 600 + i * 200);
    });
  }
})();
