document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 


let popup = document.getElementById("popup");
let puedeONo = false;
let popupGuardar = document.getElementById("popupGuardar");
let btnEscanear = document.getElementById("btnEscanear");
btnEscanear.addEventListener("click", funcionAbrir)
function funcionAbrir(){
  popup.showModal();
}
let siButton = document.getElementById("si");
let noButton = document.getElementById("no");
siButton.addEventListener("click", funcionGuardar)
noButton.addEventListener("click", funcionCerrar)

function funcionGuardar(){
  popup.close();
  popupGuardar.showModal();
}
function funcionCerrar(){
  popup.close();
}