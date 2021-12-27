//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES
productos = []
var productos
var miProducto
const URL = "http://localhost:3000/api/"


/*function updateProduct(id) {
    window.open("#")
}
function deleteProduct(id) {
    window.open("#")
}*/

function takeProductData(id, stock, price) {
    $.ajax({
        async: false,
        url: URL + "product/" + id,
        type: 'GET',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (data) {
            var miProducto = {
                name: data.name,
                description: data.description,
                maxQuantity: stock,
                price: price
            }
            productos.push(miProducto)
        },

        error: function () {
            alert("Revisa tu conexión");
        }
    });
}

$.ajax({
    async: false,
    url: URL + "weekly-product",
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (data) {
        var producto = data
        for (i in producto) {

            var id = producto[i].id
            var stock = producto[i].maxQuantity
            var price = producto[i].price
            takeProductData(id, stock, price);
        }
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

    var tr = $("<tr><th id='cProducto'>Producto</th><th id='cDescripcion'>Descripción</th><th id='cPrecio'>Precio</th><th id='cStock'>Stock</th><th id='cCantidad'>Cantidad</th><th id='cAnadir'>Añadir producto</th></tr>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);

    //RECORRER LOS PRODUCTOS
    console.log(productos)
    for (i in productos) {

        var tr2 = $("<tr><td>"
            + productos[i].name + "</td><td>"
            + productos[i].description + "</td><td>"
            + productos[i].price + "</td><td>"
            + productos[i].maxQuantity + "</td><td>"
            + "<input id='iCantidad' type='number' name='cantidad' min='1'/>" + "</td><td>"
            + "<a href='' onclick=''><img id='iBoton' src='./images/add.svg'></a>" + "</td></tr>");
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

