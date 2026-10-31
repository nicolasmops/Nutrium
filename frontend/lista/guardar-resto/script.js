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
const id = localStorage.getItem('id')

function archivoABase64(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = reject;
    lector.readAsDataURL(archivo);
  });
}

async function guardarResto() {
  const archivo = form.imagen.files[0];
  const foto = await archivoABase64(archivo);

  const ubiNueva = {
    dirección: form.address.value,
    nombre: form.nombre.value,
    descripción: form.descripcion.value,
    foto: foto
  };

  const resultado = await fetch("http://localhost:3000/ubicaciones/" + id, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ubiNueva)
  });

  if (resultado.status === 200) {
    setTimeout(() => {
      window.location.href = "../home/index.html";
    }, 2000);
  }
}

boton.addEventListener("click", (event) => {
  event.preventDefault();
  guardarResto();
});