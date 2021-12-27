//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES
productos = []
var productos
var miProducto
var contador = 0
const URL = "http://localhost:3000/api/"


function addProduct(linea) {

    document.getElementById("cantidadProductos").innerHTML = contador;

    var cantidad = document.getElementById("iCantidad" + linea).value
    var numCantidad = parseFloat(cantidad)
    if (cantidad <= productos[linea].maxQuantity) {
        $.ajax({
            async: false,
            url: URL + "order",
            type: 'POST',
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            data: JSON.stringify({
                "orderProducts": [
                    {
                        "weeklyProductId": productos[linea].id,
                        "quantity": numCantidad
                    }
                ]


            }),
            success: function (data) {
                contador = contador + 1;
                alert(productos[linea].name + " añadido a la cesta")
                //DESCONTAR STOCK
            },

            error: function () {
                alert("Revisa tu conexión");
            }
        });
    } else {
        alert("No hay suficiente stock")
    }

}

function takeProductData(id, stock, price) {
    $.ajax({
        async: false,
        url: URL + "product/" + id,
        type: 'GET',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (data) {
            var miProducto =
            {
                id: data.id,
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
    for (i in productos) {

        var tr2 = $("<tr><td>"
            + productos[i].name + "</td><td>"
            + productos[i].description + "</td><td>"
            + productos[i].price + "</td><td>"
            + productos[i].maxQuantity + "</td><td>"
            + "<input id='iCantidad" + i + "' type='number' name='cantidad' min='1' value=''/>" + "</td><td>"
            + "<a href=# onclick='addProduct(" + i + ")'><img id='iBoton' src='./images/add.svg'></a>" + "</td></tr>");
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

