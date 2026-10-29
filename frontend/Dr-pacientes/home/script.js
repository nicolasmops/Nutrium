document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

const contenedor = document.getElementById("contenedor");
const id = localStorage.getItem("id");
let pacientes = [];

contenedor.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".pac");
  if (!tarjeta) return;
  sessionStorage.setItem("pacienteSeleccionado", JSON.stringify(pacientes[tarjeta.dataset.index]));
  window.location.href = tarjeta.dataset.href;
});

async function mostrarPacientes() {
  const resultado = await fetch(`http://localhost:3000/medico/${id}/pacientes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });



  const response = await resultado.json();
  
  pacientes = response ;

  pacientes.forEach((paciente, i) => {
    contenedor.insertAdjacentHTML("beforeend", `
      <div class="pac" data-index="${i}" data-href="../info-pac/index.html">
        <img class="foto" src="${paciente.información.foto}">
        <div class="nombre">${paciente.información.nombre}</div>
        <div class="descripcion">${paciente["descripción"]}</div>
      </div>
    `);
  });
}

mostrarPacientes();