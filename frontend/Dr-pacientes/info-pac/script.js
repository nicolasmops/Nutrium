document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});

const contenedor = document.getElementById('cont');
const paciente = JSON.parse(sessionStorage.getItem('pacienteSeleccionado'));
const btnEditar = document.getElementById("editar")
const id = localStorage.getItem('id')
function srcFoto(foto) {
  if (!foto) return 'img/perfil-default.png';
  if (foto.startsWith('data:')) return foto;
  return 'data:image/png;base64,' + foto;
}

function mostrarInfoPaciente() {
  contenedor.innerHTML = `
    <div class="container">
      <img class="ftito" src="${srcFoto(paciente.información.foto)}">
      <article class="info">
        <div class="campos alto">${paciente.información.nombre}</div>
        <div class="campos">${paciente.información.email}</div>
        <div class="campos">${paciente.información.sodioMax}mg cada 100g</div>
      </article>
    </div>
    <div class ="contenedor">
    <div class="notas" id = "Notas">${paciente.descripción}</div>
        <input type="text" class="notas" name="notas" id="notas"  style="display: none;">
    </div>
  `;

  const notas = document.getElementById("Notas")
  const input = document.getElementById("notas")
  btnEditar.addEventListener("click", async ()=>{
    input.value = notas.textContent
    notas.style.display = "none"
    input.style.display = "inline-block"
    input.focus()

  
  })
input.addEventListener("blur", async () => {
  const resultado = await fetch("http://localhost:3000/medico/" + id + "/paciente/" + paciente.información.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ descripción: input.value })
  })

  if (resultado.status === 200) {
    paciente.descripción = input.value
    sessionStorage.setItem("pacienteSeleccionado", JSON.stringify(paciente))
  }

  notas.textContent = paciente.descripción
  notas.style.display = "inline-block"
  input.style.display = "none"
})
}

mostrarInfoPaciente();