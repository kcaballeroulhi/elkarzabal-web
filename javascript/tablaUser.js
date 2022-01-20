//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES

var users = []

function state(state) {
    if (state === true) {
        return "activo"
    } else {
        return "eliminado"
    }
}
function activateUser(userID) {
    $.ajax({
        async: false,
        url: URL + "user/reactivate/" + userID,
        type: 'PATCH',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (result) {
            alert("usuario activado")
            window.location.reload()
        },
        error: function () {
            alert("Revisa tu conexión");
        }
    });
}

function deleteUser(userID) {
    $.ajax({
        async: false,
        url: URL + "user/" + userID,
        type: 'DELETE',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (result) {
            alert("usuario eliminado")
            window.location.reload()
        },
        error: function () {
            alert("Revisa tu conexión");
        }
    });
}

$.ajax({
    async: false,
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

    var tr = $("<tr><th id='cProducto'>Nombre</th><th id='cDescripcion'>Apellido</th><th id='cPrecio'>email</th><th id='cPrecio'>Estado</th><th id='cPrecio'>Activar</th><th id='cPrecio'>Eliminar</th>");
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
            + state(users[i].active) + "</td><td>"
            + "<button class='bUProduct' onclick=activateUser(" + userID + ")><img id='bUP3' class='bUImage' src='./images/activateUser_verde.svg' /></button></td > <td>"
            + "<button class='bUProduct' onclick=deleteUser(" + userID + ")><img id='bUP2' class='bUImage' src='./images/delete.svg' /></button></td > <td>");

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

