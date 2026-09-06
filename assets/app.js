  // Renders available per upholstery material. First entry is the default hero shot.
  const RENDERS = {
    "Sunlit Linen": [
      ["assets/renders/yellow-linen-1.jpg", "Angled view"],
      ["assets/renders/yellow-linen-2.jpg", "Rear three-quarter"],
      ["assets/renders/yellow-linen-3.jpg", "Top view"],
      ["assets/renders/yellow-linen-4.jpg", "Seat & power outlet"],
      ["assets/renders/yellow-linen-5.jpg", "Lit shelf niche"]
    ],
    "Marine Twill": [
      ["assets/renders/blue-twill-1.jpg", "Angled view"],
      ["assets/renders/blue-twill-2.jpg", "Rear three-quarter"],
      ["assets/renders/blue-twill-3.jpg", "Top view"],
      ["assets/renders/blue-twill-4.jpg", "Seat & power outlet"],
      ["assets/renders/blue-twill-5.jpg", "Lit shelf niche"]
    ],
    "Forest Velvet": [
      ["assets/renders/green-velvet-1.jpg", "Angled view"],
      ["assets/renders/green-velvet-2.jpg", "Rear three-quarter"],
      ["assets/renders/green-velvet-3.jpg", "Top view"],
      ["assets/renders/green-velvet-4.jpg", "Seat & power outlet"],
      ["assets/renders/green-velvet-5.jpg", "Lit shelf niche"]
    ],
    "Mulberry Linen": [
      ["assets/renders/violet-linen-1.jpg", "Angled view"],
      ["assets/renders/violet-linen-2.jpg", "Rear three-quarter"],
      ["assets/renders/violet-linen-3.jpg", "Top view"],
      ["assets/renders/violet-linen-4.jpg", "Seat & power outlet"],
      ["assets/renders/violet-linen-5.jpg", "Lit shelf niche"]
    ]
  };

  // Frame finish material swatches (no furniture renders exist for these yet).
  const FINISHES = {
    "Natural Oak · Wood-look metal": "assets/finishes/natural-oak.jpg",
    "Mocha Walnut · Wood-look metal": "assets/finishes/mocha-walnut.jpg",
    "Smoked Walnut · Wood-look metal": "assets/finishes/smoked-walnut.jpg",
    "Matte Black · Powder coat": "assets/finishes/matte-black.jpg",
    "Soft Ivory · Powder coat": "assets/finishes/soft-ivory.jpg",
    "Brushed Silver · Powder coat": "assets/finishes/brushed-silver.jpg"
  };

  const heroImg = document.getElementById('heroImg');
  const heroThumbs = document.getElementById('heroThumbs');
  const defaultHero = heroImg ? heroImg.getAttribute('src') : '';

  function activate(group, target, labelId) {
    document.querySelectorAll(group).forEach(el => el.classList.remove('active'));
    target.classList.add('active');
    document.getElementById(labelId).textContent = target.dataset.name;
  }

  function buildThumbs(name) {
    if (!heroThumbs) return;
    heroThumbs.innerHTML = '';
    const views = RENDERS[name];
    if (!views) { heroThumbs.hidden = true; return; }
    heroThumbs.hidden = false;
    views.forEach((view, i) => {
      const [src, label] = view;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.title = label;
      btn.setAttribute('aria-label', label);
      if (i === 0) btn.classList.add('active');
      const img = document.createElement('img');
      img.src = src;
      img.alt = name + ' — ' + label;
      img.loading = 'lazy';
      btn.appendChild(img);
      btn.addEventListener('click', () => {
        if (heroImg) heroImg.src = src;
        heroThumbs.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      heroThumbs.appendChild(btn);
    });
  }

  const heroWrap = document.querySelector('.hero-img');

  // mode: 'photo' (upholstery renders), 'config' (flush white), 'finish' (framed tile)
  function setHeroMode(mode) {
    if (heroImg) {
      heroImg.classList.toggle('is-config', mode === 'config');
      heroImg.classList.toggle('is-finish', mode === 'finish');
    }
    if (heroWrap) heroWrap.classList.toggle('flush', mode === 'config');
    if (mode !== 'photo' && heroThumbs) { heroThumbs.innerHTML = ''; heroThumbs.hidden = true; }
  }

  function selectFabric(el) {
    activate('#fabricSwatches .swatch', el, 'fabricName');
    setHeroMode('photo');
    const name = el.dataset.name;
    if (RENDERS[name]) {
      if (heroImg) heroImg.src = RENDERS[name][0][0];
      buildThumbs(name);
    } else {
      if (heroImg) heroImg.src = defaultHero;
      buildThumbs(null);
    }
  }

  document.querySelectorAll('#fabricSwatches .swatch').forEach(el =>
    el.addEventListener('click', () => selectFabric(el))
  );
  document.querySelectorAll('#frameSwatches .swatch').forEach(el =>
    el.addEventListener('click', () => {
      activate('#frameSwatches .swatch', el, 'frameName');
      const src = FINISHES[el.dataset.name];
      if (src && heroImg) { heroImg.src = src; setHeroMode('finish'); }
    })
  );
  document.querySelectorAll('#configs .config').forEach(el =>
    el.addEventListener('click', () => {
      activate('#configs .config', el, 'configName');
      if (el.dataset.img && heroImg) { heroImg.src = el.dataset.img; setHeroMode('config'); }
    })
  );

  // If a material with renders starts active, show its gallery on load.
  const startFabric = document.querySelector('#fabricSwatches .swatch.active');
  if (startFabric && RENDERS[startFabric.dataset.name]) {
    selectFabric(startFabric);
  }
