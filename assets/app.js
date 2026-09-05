  function activate(group, target, labelId) {
    document.querySelectorAll(group).forEach(el => el.classList.remove('active'));
    target.classList.add('active');
    document.getElementById(labelId).textContent = target.dataset.name;
  }
  document.querySelectorAll('#fabricSwatches .swatch').forEach(el =>
    el.addEventListener('click', () => activate('#fabricSwatches .swatch', el, 'fabricName'))
  );
  document.querySelectorAll('#frameSwatches .swatch').forEach(el =>
    el.addEventListener('click', () => activate('#frameSwatches .swatch', el, 'frameName'))
  );
  document.querySelectorAll('#configs .config').forEach(el =>
    el.addEventListener('click', () => activate('#configs .config', el, 'configName'))
  );
