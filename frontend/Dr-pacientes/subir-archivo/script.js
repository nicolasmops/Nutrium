document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 
  const paciente = JSON.parse(sessionStorage.getItem("pacienteSeleccionado"))
  const nombreP = document.querySelector(".nombre")
  const fotoP = document.querySelector(".ftPerfil")
    const id = localStorage.getItem('id')

    nombreP.innerHTML = `${paciente.información.nombre}`
  fotoP.src =  "data:image/png;base64," + paciente.información.foto
  const form = document.getElementById("form");
const boton = document.getElementById("boton");
const input = document.querySelector(".ft");
const odioAChlo = document.getElementById("subir");

input.addEventListener("change", () => {
  const archivo = input.files[0];
  odioAChlo.textContent = archivo ? archivo.name : "Subir archivo";
});

async function guardarArchivo() {
  const archivo = input.files[0];
  if (!archivo) {
    alert("Seleccioná un archivo");
    return;
  }

  const formData = new FormData();
  formData.append("archivo", archivo);
  formData.append("nombre", form.nombre.value);

  const resultado = await fetch("http://localhost:3000/medico/" + id + "/paciente/" + paciente.información.id + "/historialMedico", {
    method: "POST",
    body: formData
  });

  if (resultado.status === 200) {
    setTimeout(() => {
      window.location.href = "../Historial-Medico-Paciente/index.html";
    }, 2000);
  }
}

boton.addEventListener("click", (event) => {
  event.preventDefault();
  guardarArchivo();
});
