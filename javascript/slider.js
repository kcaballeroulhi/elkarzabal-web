var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");

var circulo1 = document.getElementById("circulo1");
var circulo2 = document.getElementById("circulo2");
var circulo3 = document.getElementById("circulo3");

var imagenActual = 1;

img2.style.visibility = "hidden";
img2.style.transform = "translate(0px,-457px)";
img3.style.visibility = "hidden";
img3.style.transform = "translate(0px,-914px)";

cir1Relleno2();

setInterval('adelanteImg()',4000);

function cir1Relleno1() {
    circulo1.style.background = "#E6EFD0";
    circulo1.style.border = "0.5px solid #567661";
}

function cir1Relleno2() {
    circulo1.style.background = "#567661";
    circulo1.style.border = "0.5px solid #E6EFD0";
}

function cir2Relleno1() {
    circulo2.style.background = "#E6EFD0";
    circulo2.style.border = "0.5px solid #567661";
}

function cir2Relleno2() {
    circulo2.style.background = "#567661";
    circulo2.style.border = "0.5px solid #E6EFD0";
}

function cir3Relleno1() {
    circulo3.style.background = "#E6EFD0";
    circulo3.style.border = "0.5px solid #567661";
}

function cir3Relleno2() {
    circulo3.style.background = "#567661";
    circulo3.style.border = "0.5px solid #E6EFD0";
}

function adelanteImg() {
    if(imagenActual == 1) {
        imagen2();
    }

    else if(imagenActual == 2) {
        imagen3();
    }

    else if(imagenActual == 3) {
        imagen1();
    }
}

function atrasImg() {
    if(imagenActual == 1) {
        imagen3();
    }

    else if(imagenActual == 2) {
        imagen1();
    }

    else if(imagenActual == 3) {
        imagen2();
    }
}

function imagen1() {
    img3.style.visibility = "hidden";
    img2.style.visibility = "hidden";
    img3.style.opacity = "0";
    img2.style.opacity = "0";
    cir3Relleno1();
    cir2Relleno1();
    img1.style.visibility = "visible";
    img1.style.opacity = "1";
    img1.style.transition = "all 1s ease-out";
    cir1Relleno2();
    imagenActual = 1;
}

function imagen2() {
    img3.style.visibility = "hidden";
    img1.style.visibility = "hidden";
    img1.style.opacity = "0";
    img3.style.opacity = "0";
    cir1Relleno1();
    cir3Relleno1();
    img2.style.visibility = "visible";
    img2.style.opacity = "1";
    img2.style.transition = "all 1s ease-out";
    cir2Relleno2();
    imagenActual = 2;
}

function imagen3() {
    img1.style.visibility = "hidden";
    img2.style.visibility = "hidden";
    img1.style.opacity = "0";
    img2.style.opacity = "0";
    cir1Relleno1();
    cir2Relleno1();
    img3.style.visibility = "visible";
    img3.style.opacity = "1";
    img3.style.transition = "all 1s ease-out";
    cir3Relleno2();
    imagenActual = 3;
}
