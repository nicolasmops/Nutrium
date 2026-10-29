document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 

const form = document.getElementById('formulario');
const boton = document.getElementById('agregar');
const id = localStorage.getItem('id');

async function agregarPaciente() {
  let pacienteNuevo = {
    descripción: form.notas.value,
  información: {
    nombre: form.nombre.value,
    email: form.email.value,
  }
  }

 const response = await fetch("http://localhost:3000/medico/" + id + "/pacientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pacienteNuevo)
  });

  if (response.status === 200) {
    alert("Paciente agregado correctamente");
    window.location.href = "../home/index.html";
  }
}

boton.addEventListener('click', (e) => {
  e.preventDefault();
  agregarPaciente();
});