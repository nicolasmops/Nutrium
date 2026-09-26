document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-href]').forEach(el => {
      el.addEventListener('click', () => {
        window.location.href = el.dataset.href;
      });
    });
  }); 
  console.log("se commitear y pushear con cmd")

let popup = document.getElementById("popup");
let puedeONo = false;

if(puedeONo == true){
  popup.showModal()
}
else{
  popup.close()
}

let siButton = document.getElementById("si");
let noButton = document.getElementById("no");
síButton.addEventListener("click", funcionGuardar)
noButton.addEventListener("click", funcionCerrar)

function funcionGuardar(){
  popup.close();
  popupGuardar.showModal();
}
function funcionCerrar(){
  popup.close();
}