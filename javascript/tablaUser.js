//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES
const URL = "http://localhost:3000/api/";
var users = []

function activateUser(userID) {
    $.ajax({
        url: URL + "user/reactivate/" + userID,
        type: 'PATCH',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (result) {
            console.log(result)
            alert("usuario activado")
        },
        error: function () {
            alert("Revisa tu conexión");
        }
    });
}

function deleteUser(userID) {
    $.ajax({
        url: URL + "user/" + userID,
        type: 'DELETE',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (result) {
            console.log(result)
            alert("usuario eliminado")
        },
        error: function () {
            alert("Revisa tu conexión");
        }
    });
}

$.ajax({
    url: URL + "user",
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (result) {
        users = result
    },
    error: function () {
        alert("Revisa tu conexión");
    }
});

$(document).ready(function () {
    var cuerpoTabla = $('#cuerpoTablaProducto');

    var tabla = $("<table></table>");
    tabla.attr({
        id: "tabla"
    });

    var tr = $("<tr><th id='cProducto'>Nombre</th><th id='cDescripcion'>Apellido</th><th id='cPrecio'>email</th>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);


    //RECORRER LOS PRODUCTOS
    for (i in users) {
        var userID = users[i].id
        var tr2 = $("<tr><td>"
            + users[i].name + "</td><td>"
            + users[i].lastname + "</td><td>"
            + users[i].email + "</td><td>"
            + "<button onclick=activateUser(" + userID + ")>Activar</button></td > <td>"
            + "<button onclick=deleteUser(" + userID + ")>Eliminar</button></td > <td>");

        tr2.attr({
            id: "celdas"
        });

        if (i % 2 == 0) {
            tr2.css("background-color", "#E6EFD0");
        }

        tabla.append(tr2);
    }

    cuerpoTabla.append(tabla);
})

