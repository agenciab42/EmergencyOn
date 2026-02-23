
// Countdown to March 15, 2026
(function () {
  var deadline = new Date('2026-03-15T23:59:59').getTime();

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

    var dEl = document.getElementById('cd-days');
    var hEl = document.getElementById('cd-hours');
    var mEl = document.getElementById('cd-mins');

    if (dEl) dEl.textContent = pad(days);
    if (hEl) hEl.textContent = pad(hours);
    if (mEl) mEl.textContent = pad(mins);
  }

  tick();
  setInterval(tick, 30000);
})();
