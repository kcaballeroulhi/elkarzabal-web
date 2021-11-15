$(document).ready(function(){
    $("#ventanaModal").hide();
    $("#ventanaModalUsuario").hide();
    $("#ventanaModalAdmin").hide();
})

function mostrarVentanaSesion() {
    $("#ventanaModal").show();
}

function mostrarVentanaAdmin() {
    $("#ventanaModalAdmin").show();
}

function cerrarVentanaSesion() {
    $("#ventanaModal").hide();
}

function cerrarVentanaAdmin() {
    $("#ventanaModalAdmin").hide();
}
