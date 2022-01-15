
var divIcUser = document.getElementById("divIcUser" );
var divTxUser = document.getElementById("divTxUser");
var aModAdmin = document.getElementById("actualAdmin");
var accAdmin = document.getElementById("accPAdmin");
if(leerCookie( "roleId" ) == 2) {
    divIcUser.onclick = function() {
        alert("No tiene permisos para acceder a esta sección");
    }
    divTxUser.onclick = function() {
        alert("No tiene permisos para acceder a esta sección");
    }
    aModAdmin.onclick = function() {
        alert("No tiene permisos para acceder a esta sección");
    }
    divIcUser.setAttribute("href", "#");
    divTxUser.setAttribute("href", "#");
    aModAdmin.setAttribute("href", "#");
    accAdmin.setAttribute("href", "./productos.html");
};
