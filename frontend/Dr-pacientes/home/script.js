document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor");
  const buscador = document.getElementById("buscador");
  const id = localStorage.getItem("id");

  let pacientes = [];

  function srcFoto(foto) {
    if (!foto) return "img/perfil-default.png";
    if (foto.startsWith("data:")) return foto;
    return "data:image/png;base64," + foto;
  }

  function mostrarPacientes(lista) {
    contenedor.innerHTML = "";

    lista.forEach((paciente) => {
      const indice = pacientes.indexOf(paciente);

      contenedor.insertAdjacentHTML(
        "beforeend",
        `
          <div class="pac" data-index="${indice}" data-href="../info-pac/index.html">
            <img class="foto" src="${srcFoto(paciente.información.foto)}">
            <div class="nombre">${paciente.información.nombre}</div>
            <div class="descripcion">${paciente.información.sodioMax}mg</div>
          </div>
        `
      );
    });
  }

  contenedor.addEventListener("click", (e) => {
    const tarjeta = e.target.closest(".pac");
    if (!tarjeta) return;

    const paciente = pacientes[Number(tarjeta.dataset.index)];
    if (!paciente) return;

    sessionStorage.setItem("pacienteSeleccionado", JSON.stringify(paciente));
    window.location.href = tarjeta.dataset.href;
  });

  async function cargarPacientes() {
    try {
      const resultado = await fetch(
        `http://localhost:3000/medico/${id}/pacientes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = await resultado.json();

      if (!Array.isArray(response)) {
        alert(response.estatus ?? "No se pudieron cargar los pacientes.");
        return;
      }

      pacientes = response;
      mostrarPacientes(pacientes);
    } catch (error) {
      console.error("Error al cargar los pacientes:", error);
      alert("No se pudo conectar con el servidor.");
    }
  }

  function buscar() {
    const texto = buscador.value.toLowerCase();

    const pacientesFiltrados = pacientes.filter((paciente) => {
      const nombre = paciente.información?.nombre ?? "";
      const descripcion = paciente["descripción"] ?? "";

      return (
        nombre.toLowerCase().includes(texto) ||
        descripcion.toLowerCase().includes(texto)
      );
    });

    mostrarPacientes(pacientesFiltrados);
  }

  buscador.addEventListener("input", buscar);

  cargarPacientes();
});