//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES
var productos = []
var orderProducts = []
const URL = "http://localhost:3000/api/"
var temp = false

function validateStock(quantity, maxQuantity) {
    console.log(quantity)
    console.log(maxQuantity)
    if (quantity <= maxQuantity) {
        return true
    } else {
        return false
    }

}
function addProduct(linea) {
    var cantidad = document.getElementById("iCantidad" + linea).value
    var numCantidad = parseFloat(cantidad)

    var unProducto = {
        "id": productos[linea].id,
        "name": productos[linea].name,
        "description": productos[linea].description,
        "cantidad": numCantidad,
        "medida": productos[linea].measurementUnit,
        "precio": productos[linea].price
    }


    if (localStorage.getItem("pedido") === null) {
        if (validateStock(numCantidad, productos[linea].currentQuantity)) {
            orderProducts.push(unProducto)
            localStorage.setItem('pedido', JSON.stringify(orderProducts));
            document.getElementById("cantidadProductos").innerHTML = orderProducts.length
        }
        else {
            alert("No hay suficiente stock")
        }

    } else {
        var guardado = localStorage.getItem('pedido');
        var order = JSON.parse(guardado)
        if (validateStock(numCantidad, productos[linea].currentQuantity)) {
            for (i in order) {
                if (order[i].id === productos[linea].id) {
                    temp = true
                    order[i].cantidad = numCantidad
                    localStorage.removeItem("pedido")
                    localStorage.setItem("pedido", JSON.stringify(order))
                    document.getElementById("cantidadProductos").innerHTML = orderProducts.length
                }
            }
            if (temp === false) {
                orderProducts.push(unProducto)
                localStorage.setItem('pedido', JSON.stringify(orderProducts));
                document.getElementById("cantidadProductos").innerHTML = orderProducts.length
            } else {
                temp = false
            }
        }
        else {
            alert("No hay suficiente stock")
        }

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
                currentQuantity: stock,
                price: price,
                measurementUnit: data.measurementUnit
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
            var stock = producto[i].currentQuantity
            var price = producto[i].price
            takeProductData(id, stock, price);
        }
    },
    error: function () {
        alert("Revisa tu conexión");
    }
});

$(document).ready(function () {
    document.getElementById("cantidadProductos").innerHTML = orderProducts.length
    localStorage.removeItem('pedido')
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
            + productos[i].currentQuantity + "</td><td>"
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

