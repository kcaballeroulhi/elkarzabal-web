//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES
if (localStorage.getItem('pedido') !== null) {
    var guardado = localStorage.getItem('pedido');
    var orderProducts = JSON.parse(guardado)
} else {
    var orderProducts = []
}
var productos = []
var temp = false

function validateStock(quantity, maxQuantity) {
    if (quantity <= maxQuantity) {
        return true
    } else {
        return false
    }

}

function deleteProduct(item) {
    var i = orderProducts.indexOf(item);
    if (i !== -1) {
        orderProducts.splice(i, 1);
    }
}

function addProduct(linea) {
    var cantidad = document.getElementById("iCantidad" + linea).value
    var numCantidad = parseFloat(cantidad)
    console.log(productos)
    var unProducto = {
        "productID": productos[linea].productID,
        "weeklyProductID": productos[linea].weeklyProductID,
        "name": productos[linea].name,
        "description": productos[linea].description,
        "cantidad": numCantidad,
        "medida": productos[linea].measurementUnit,
        "precio": productos[linea].price
    }
    console.log(unProducto)

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
                if (order[i].productID === productos[linea].productID) {
                    temp = true
                    if (numCantidad === 0) {
                        orderProducts.splice(i, 1);
                        order = orderProducts
                    } else {
                        order[i].cantidad = numCantidad
                    }
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

function takeProductData(id, weeklyID, stock, price) {
    $.ajax({
        async: false,
        url: URL + "product/" + id,
        type: 'GET',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (data) {
            var miProducto =
            {
                productID: id,
                weeklyProductID: weeklyID,
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
        //console.log(data)
        for (i in producto) {

            var productID = producto[i].productId
            var weeklyProductID = producto[i].id
            var stock = producto[i].currentQuantity
            var price = producto[i].price
            takeProductData(productID, weeklyProductID, stock, price);
        }
    },
    error: function () {
        alert("Revisa tu conexión");
    }
});

$(document).ready(function () {
    document.getElementById("cantidadProductos").innerHTML = orderProducts.length
    //localStorage.removeItem('pedido')
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

