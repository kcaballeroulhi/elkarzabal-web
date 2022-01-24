var firstName = "";
var lastName = "";
var address = "";
var phone = "";
var order = [];

function confirm() {
    $.ajax({
        method: "PATCH",
        url: URL + "order/" + urlID,
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        data: JSON.stringify({
            "statusId": 2
        }),
        contentType: "application/json",
        success: function (data) {
            alert("Pedido " + urlID + " validado correctamente")
            window.location.replace('./validateOrder.html');

        },
        error: function (e) {
            console.log(e)
        }
    });
}

$.ajax({
    async: false,
    url: URL + "order/" + urlID + "/detailed",
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (result) {
        firstName = result.user.name;
        lastName = result.user.lastname;
        phone = result.user.phone;
        address = result.user.address;
        order = result.orderProducts
    },
    error: function () {
        alert("Revisa tu conexión");
    }
});


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
        total = total + order[i].weeklyProduct.price * order[i].quantity;
        var tr2 = $("<tr><td>"
            + order[i].weeklyProduct.product.name + "</td><td>"
            + order[i].weeklyProduct.product.description + "</td><td>"
            + order[i].weeklyProduct.product.measurementUnit + "</td><td>"
            + order[i].quantity + "</td><td>"
            + order[i].weeklyProduct.price + "</td><td>"
            + order[i].weeklyProduct.price * order[i].quantity + "</td>");
        tr2.attr({
            id: "celdas"
        });

        if (i % 2 == 0) {
            tr2.css("background-color", "#E6EFD0");
        }

        tabla.append(tr2);

    }
    var button = '<button id="bValidar" class="bUProduct" onclick=confirm()>Validar</button>';
    var th1 = $("<th colspan='4'></th>");
    var th2 = $("<th id='subtotal'>" + "Subtotal" + "</th>");
    var tr3 = $("<td id='celdaSub' >" + total + "</td>");
    tabla.append(th1);
    tabla.append(th2);
    tabla.append(tr3);
    cuerpoTabla.append(tabla);
    cuerpoTabla.append(button);

    var nom = $("#nom");
    nom.append("&nbsp;" + firstName);
    var apl = $("#apl");
    apl.append("&nbsp;" + lastName);
    var dir = $("#dir");
    dir.append("&nbsp;" + address);
    var tel = $("#tel");
    tel.append("&nbsp;" + phone);
})