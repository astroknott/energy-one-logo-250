(function () {
  'use strict';

  const slides  = Array.from(document.querySelectorAll('.slide'));
  const counter = document.getElementById('counter');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  let idx = 0;

  function go(n) {
    slides[idx].classList.remove('active');
    idx = Math.max(0, Math.min(n, slides.length - 1));
    slides[idx].classList.add('active');
    counter.textContent = (idx + 1) + ' / ' + slides.length;
    btnPrev.disabled = idx === 0;
    btnNext.disabled = idx === slides.length - 1;
  }

  btnPrev.addEventListener('click', function () { go(idx - 1); });
  btnNext.addEventListener('click', function () { go(idx + 1); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { go(idx - 1); }
    if (e.key === 'ArrowRight') { go(idx + 1); }
    if (e.key === ' ')          { e.preventDefault(); go(idx + 1); }
    if (e.key === 'Escape')     { go(0); }
  });

  var tx = 0;
  document.addEventListener('touchstart', function (e) {
    tx = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) { go(dx < 0 ? idx + 1 : idx - 1); }
  });

  go(0);
}());
