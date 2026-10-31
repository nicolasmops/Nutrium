document.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href
    })
  })

  const home = document.querySelector('.Home [data-href], .Home[data-href]')
  if (!home) return

  let esMedico = JSON.parse(localStorage.getItem('esMedico'))

  if (esMedico === null) {
    const id = localStorage.getItem('id')
    const resultado = await fetch("http://localhost:3000/usuario/" + id)
    const usuario = await resultado.json()
    esMedico = usuario.esMedico
    localStorage.setItem('esMedico', JSON.stringify(esMedico))
  }

  if (esMedico === true) {
    home.dataset.href = home.dataset.href.replace("home/paciente", "home/doctor")
  }
})

const form = document.getElementById("form");
const boton = document.getElementById("boton");
const id = localStorage.getItem("id");
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

  const resultado = await fetch("http://localhost:3000/historialMedico/" + id, {
    method: "POST",
    body: formData
  });

  if (resultado.status === 200) {
    alert("Archivo subido exitosamente");
    setTimeout(() => {
      window.location.href = "../home/index.html";
    }, 2000);
  }
}

boton.addEventListener("click", (event) => {
  event.preventDefault();
  guardarArchivo();
});