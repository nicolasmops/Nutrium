document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mensaje').forEach(el => {
      el.addEventListener('click', () => {
        el.classList.toggle('abierto');
      });
    });
  });