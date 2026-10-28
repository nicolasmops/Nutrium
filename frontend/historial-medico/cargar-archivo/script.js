document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 

  const form = document.getElementById("form")
  const boton = document.getElementById("boton")
  const id = localStorage.getItem("id")
  async function guardarArchivo() {
    const archivo = input.files[0]
    const formData = new FormData()
  formData.append("archivo", archivo)
  formData.append("nombre", form.nombre.value)

  const resultado = await fetch ("http://localhost:3000/historialMedico/" + id, {
    method: 'POST',
    body:formData
  })
   
  if (resusltado.status === 200){
    alert("Archivo subido exitosamente")
    setTimeout(() => {
      window.location.href = "../home/index.html";
    }, 2000);
  }
  }