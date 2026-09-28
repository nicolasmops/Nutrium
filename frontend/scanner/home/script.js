document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 


let popup = document.getElementById("popup");
let popupGuardar = document.getElementById("popupGuardar");
let btnEscanear = document.getElementById("btnEscanear");
btnEscanear.addEventListener("click", funcionAbrir)
function funcionAbrir(){
  popup.showModal();
}
let siButton = document.getElementById("si");
let noButton = document.getElementById("no");
let guardarButton = document.getElementById("btnGuardar")
siButton.addEventListener("click", funcionAbrirGuardar)
noButton.addEventListener("click", funcionCerrar)
guardarButton.addEventListener("click", funcionGuardar )

function funcionAbrirGuardar(){
  popup.close();
  popupGuardar.showModal();
}
function funcionCerrar(){
  popup.close();
}
function funcionGuardar(){
  popupGuardar.close()
}