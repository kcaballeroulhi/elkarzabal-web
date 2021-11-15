var estado = true;
var div = document.getElementById("menuAdmin-Submenu");
div.style.transitionDuration = "0.7s";
var div3 = document.getElementById("menuAdmin");
div3.style.transitionDuration = "0.7s";

function comprobarEstado() {
    return estado;
}

function extender() {
    let anchura = window.innerWidth;
    if(anchura > 980) {
        div.style.transform = "translate(200px,0)";
        document.getElementById("imgCamb").src = "./images/close.svg";
        estado = false;
    } else {
        div3.style.transform = "translate(50px,0)";
        div.style.transform = "translate(230px,0)";
        document.getElementById("imgCamb").src = "./images/close.svg";
        estado = false;
    }

}
function encoger() {
    let anchura = window.innerWidth;
    if(anchura > 980) {
        div.style.transform = "translate(-200px,0)";
        document.getElementById("imgCamb").src = "./images/barras.svg";
        estado = true;
    } else {
        div3.style.transform = "translate(-50px,0)";
        div.style.transform = "translate(-270px,0)";
        document.getElementById("imgCamb").src = "./images/barras.svg";
        estado = true;
    }
}

function extenderMenuWeb() {
    let div2 = document.getElementById("contenedorCabecera-Menu");
    div2.style.transitionDuration = "0.7s";
    div2.style.transform = "translate(0,290px)";
    document.getElementById("imgCamb2").src = "./images/closeVerde.svg";
    estado = false;
}

function encogerMenuWeb() {
    let div2 = document.getElementById("contenedorCabecera-Menu");
    div2.style.transitionDuration = "0.7s";
    div2.style.transform = "translate(0,-350px)";
    document.getElementById("imgCamb2").src = "./images/barrasVerdes.svg";
    estado = true;
}