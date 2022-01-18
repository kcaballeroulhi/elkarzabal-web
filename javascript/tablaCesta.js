var guardado = localStorage.getItem('pedido');
var order = JSON.parse(guardado)
var createOrder = []



function confirm() {
    for (i in order) {
        var id = order[i].weeklyProductID
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
            alert("Pedido realizado correctamente")
            localStorage.removeItem('pedido')
            window.location.replace('./pedido.html');
        },
        error: function (e) {
            alert("Revise su pedido")
        }
    });

}

$(document).ready(function () {

    var cuerpoTabla = $('#cuerpoTablaPedido');

    var tabla = $("<table></table>");
    tabla.attr({
        id: "tabla"
    });

    var tr = $("<tr><th id='cProducto'>Producto</th><th id='cDescripcion'>Descripción</th><th id='cPrecio'>Unidad de medida</th><th id='cStock'>Cantidad</th><th id='cPrecio'>Precio</th><th id='total'>Total</th></tr>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);
    var total = 0;
    //RECORRER LOS PRODUCTOS
    for (i in order) {
        //var subTotal = subTotal + order[i].precio * order[i].cantidad;
        total = total + order[i].precio * order[i].cantidad;
        var tr2 = $("<tr><td>"
            + order[i].name + "</td><td>"
            + order[i].description + "</td><td>"
            + order[i].medida + "</td><td>"
            + order[i].cantidad + "</td><td>"
            + order[i].precio + "</td><td>"
            + order[i].precio * order[i].cantidad + "</td>");
        tr2.attr({
            id: "celdas"
        });

        if (i % 2 == 0) {
            tr2.css("background-color", "#E6EFD0");
        }

        tabla.append(tr2);
        var button = '<button class="bUProduct" onclick=confirm()>Confirmar</button>';
    }
    var th1 = $("<th colspan='4'></th>");
    var th2 = $("<th id='subtotal'>" + "Subtotal" + "</th>");
    var tr3 = $("<td id='celdaSub' >" + total + "</td>");
    tabla.append(th1);
    tabla.append(th2);
    tabla.append(tr3);
    cuerpoTabla.append(tabla);
    cuerpoTabla.append(button);
})