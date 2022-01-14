var divIcUser = document.getElementById("divIcUser" );
var divTxUser = document.getElementById("divTxUser");
if(leerCookie( "roleId" ) == 2) {
    divIcUser.disabled = true;
    divTxUser.disabled = true;
};