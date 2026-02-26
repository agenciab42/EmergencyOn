
// Scroll reveal — fade-up on enter viewport
(function () {
  var els = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(function (el) { observer.observe(el); });
})();

// Typing effect — pricing includes list
(function () {
  var list = document.querySelector('.pricing__includes');
  var pricingLeft = document.querySelector('.pricing__left');
  if (!list || !pricingLeft) return;

  var items = Array.prototype.slice.call(list.querySelectorAll('li'));
  var texts = items.map(function (li) { return li.textContent.trim(); });

  // Clear all items up front
  items.forEach(function (li) {
    li.textContent = '';
    li.style.visibility = 'hidden';
  });

  function typeItem(index) {
    if (index >= items.length) return;
    var li    = items[index];
    var text  = texts[index];
    var i     = 0;
    li.style.visibility = 'visible';
    var timer = setInterval(function () {
      li.textContent = text.slice(0, i + 1);
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setTimeout(function () { typeItem(index + 1); }, 70);
      }
    }, 12);
  }

  // Start typing once the reveal transition of the left column finishes
  pricingLeft.addEventListener('transitionend', function onDone(e) {
    if (e.propertyName === 'opacity' && pricingLeft.classList.contains('is-visible')) {
      pricingLeft.removeEventListener('transitionend', onDone);
      typeItem(0);
    }
  });

  // Fallback for no-JS / no-IO browsers
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (li, i) {
      li.textContent = texts[i];
      li.style.visibility = 'visible';
    });
  }
})();

// Countdown to March 16, 2026 at 19:59 Brasília (UTC-3)
(function () {
  var deadline = new Date('2026-03-16T19:59:00-03:00').getTime();

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var now = Date.now();
    var diff = deadline - now;

    if (diff <= 0) {
      var wrap = document.querySelector('.pricing__countdown');
      if (wrap) {
        wrap.innerHTML = '<p style="color:#fff;font-size:16px;font-weight:700;text-align:center;">Inscrições encerradas</p>';
      }
      return;
    }

    var days  = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var mins  = Math.floor((diff % 3600000)  / 60000);
    var secs  = Math.floor((diff % 60000)    / 1000);

    var dEl = document.getElementById('cd-days');
    var hEl = document.getElementById('cd-hours');
    var mEl = document.getElementById('cd-mins');
    var sEl = document.getElementById('cd-secs');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
    if (sEl) sEl.textContent = pad(secs);
  }

  tick();
  setInterval(tick, 1000);
})();
