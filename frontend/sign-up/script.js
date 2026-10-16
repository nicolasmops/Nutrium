document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  });
  const form = document.getElementById("formulario")
  const nombre = document.getElementById("nombre") 
async function registrarse() {

  
}