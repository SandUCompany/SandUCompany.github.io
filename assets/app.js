  // Renders available per upholstery material. First entry is the default hero shot.
  const RENDERS = {
    "Sunlit Linen": [
      ["assets/renders/yellow-linen-main.jpg",  "Angled view"],
      ["assets/renders/yellow-linen-angle.jpg", "Rear three-quarter"],
      ["assets/renders/yellow-linen-top.jpg",   "Top view"],
      ["assets/renders/yellow-linen-seat.jpg",  "Seat & power outlet"],
      ["assets/renders/yellow-linen-niche.jpg", "Lit shelf niche"]
    ],
    "Marine Twill": [
      ["assets/renders/blue-twill-main.jpg",   "Front view"],
      ["assets/renders/blue-twill-angle.jpg",  "Rear three-quarter"],
      ["assets/renders/blue-twill-angle2.jpg", "Rear three-quarter, arm"],
      ["assets/renders/blue-twill-top.jpg",    "Top view"],
      ["assets/renders/blue-twill-seat.jpg",   "Seat & power outlet"],
      ["assets/renders/blue-twill-niche.jpg",  "Lit shelf niche"]
    ],
    "Forest Velvet": [
      ["assets/renders/green-velvet-main.jpg",   "Front view"],
      ["assets/renders/green-velvet-angle.jpg",  "Rear three-quarter"],
      ["assets/renders/green-velvet-angle2.jpg", "Rear three-quarter, arm"],
      ["assets/renders/green-velvet-top.jpg",    "Top view"],
      ["assets/renders/green-velvet-seat.jpg",   "Seat & power outlet"],
      ["assets/renders/green-velvet-niche.jpg",  "Lit shelf niche"]
    ],
    "Mulberry Linen": [
      ["assets/renders/violet-linen-main.jpg",   "Front view"],
      ["assets/renders/violet-linen-angle.jpg",  "Rear three-quarter"],
      ["assets/renders/violet-linen-angle2.jpg", "Rear three-quarter, arm"],
      ["assets/renders/violet-linen-top.jpg",    "Top view"],
      ["assets/renders/violet-linen-seat.jpg",   "Seat & power outlet"],
      ["assets/renders/violet-linen-niche.jpg",  "Lit shelf niche"]
    ]
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

  function selectFabric(el) {
    activate('#fabricSwatches .swatch', el, 'fabricName');
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
    el.addEventListener('click', () => activate('#frameSwatches .swatch', el, 'frameName'))
  );
  document.querySelectorAll('#configs .config').forEach(el =>
    el.addEventListener('click', () => activate('#configs .config', el, 'configName'))
  );

  // If a material with renders starts active, show its gallery on load.
  const startFabric = document.querySelector('#fabricSwatches .swatch.active');
  if (startFabric && RENDERS[startFabric.dataset.name]) {
    selectFabric(startFabric);
  }
