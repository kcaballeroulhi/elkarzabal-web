var guardado = localStorage.getItem('pedido');
var order = JSON.parse(guardado)
var createOrder = []
const URL = "http://localhost:3000/api/";

function confirm() {

    for (i in order) {
        var id = order[i].id
        var quantity = order[i].cantidad
        var orderUnit = {
            "weeklyProductId": id,
            "quantity": quantity
        }
        createOrder.push(orderUnit)
    }
    var orderProducts = createOrder

    $.ajax({
        method: "POST",
        url: URL + "order",
        data: JSON.stringify({ orderProducts }),
        contentType: "application/json",
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (data) {
            console.log(data)

        },
        error: function (e) {
            document.getElementById("mensajeErrorInicioSesion").innerHTML = "Usuario o contraseña incorrecto"
        }
    });

}

$(document).ready(function () {

    var cuerpoTabla = $('#cuerpoTablaPedido');

    var tabla = $("<table></table>");
    tabla.attr({
        id: "tabla"
    });

    var tr = $("<tr><th id='cProducto'>Producto</th><th id='cDescripcion'>Descripción</th><th id='cPrecio'>Unidad de medida</th><th id='cStock'>Cantidad</th><th id='cPrecio'>Precio</th><th id=''>Total</th></tr>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);

    //RECORRER LOS PRODUCTOS
    for (i in order) {

        var tr2 = $("<tr><td>"
            + order[i].name + "</td><td>"
            + order[i].description + "</td><td>"
            + order[i].medida + "</td><td>"
            + order[i].cantidad + "</td><td>"
            + order[i].precio + "</td><td>"
            + order[i].precio * order[i].cantidad + "</td><td>");
        tr2.attr({
            id: "celdas"
        });

        if (i % 2 == 0) {
            tr2.css("background-color", "#E6EFD0");
        }

        tabla.append(tr2);
        var button = '<button class="bUProduct" onclick=confirm()>Confirmar</button>';
    }

    cuerpoTabla.append(tabla);
    cuerpoTabla.append(button);
})