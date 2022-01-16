//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES

var orders = []

function viewOrder(id) {
    window.location.replace("./viewOrder.html?id=" + id);
}

$.ajax({
    async: false,
    url: URL + "order?status=1",
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (result) {
        console.log(result)
        orders = result
        console.log(orders)
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

    var tr = $("<tr><th id='cProducto'>Nombre</th><th id='cDescripcion'>Apellido</th><th id='cPrecio'>ID pedido</th><th id='cPrecio'>Ver Pedido</th>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);


    //RECORRER LOS PRODUCTOS
    for (i in orders) {
        var orderID = orders[i].id
        var tr2 = $("<tr><td>"
            + orders[i].user.name + "</td><td>"
            + orders[i].user.lastname + "</td><td>"
            + orders[i].id + "</td><td>"
            + "<button class='bUProduct' onclick=viewOrder(" + orderID + ")><img id='bUP2' class='bUImage' src='./images/delete.svg' /></button></td > <td>");

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

