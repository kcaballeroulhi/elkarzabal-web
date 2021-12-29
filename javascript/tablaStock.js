//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES

productos = []
var productos
const URL = "http://localhost:3000/api/"

function addBBDD(id, stock, price) {
    $.ajax({
        method: "POST",
        url: URL + "weekly-product",
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        data: JSON.stringify({ "productId": id, "maxQuantity": stock, "price": price }),
        contentType: "application/json",
        success: function (data) {
            alert("añadido correctamente")
        },
        error: function (e) {
            alert("se ha producido un error")
        }
    });
}


function update() {
    //console.log("hola")


    var tab = document.getElementById("tabla");
    var rows = tab.rows;

    for (var i = 1; i < rows.length; i++) {// recorre las filas de la tabla
        var tag = "chk" + i;
        var idTag = "id" + i;
        var stockTag = "cantidad" + i;
        var priceTag = "precio" + i;
        if (document.getElementById(tag).checked) {
            var id = document.getElementById(idTag).value;
            var intID = parseInt(id);
            var stock = document.getElementById(stockTag).value;
            var numberStock = parseFloat(stock);
            var price = document.getElementById(priceTag).value;
            var numberPrice = parseFloat(price)
            addBBDD(intID, numberStock, numberPrice)
        }
    }
}


$.ajax({
    async: false,
    url: URL + "product/base",
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (data) {
        productos = data
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

    var tr = $("<tr><th id='cProducto'></th><th id='cProducto'>Imagen</th><th id='cProducto'>Producto</th><th id='cPrecio'>Unidad de medida</th><th id='cDescripcion'>Cantidad</th><th id='cDescripcion'>Precio</th>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);


    //RECORRER LOS PRODUCTOS
    for (i in productos) {
        var productID = productos[i].id
        var imagen = productos[i].images[0]
        var tr2 = $("<tr><td>"
            + '<input type="checkbox" id="chk' + productID + '"> </td><td>'
            + '<img src="' + imagen + '" alt="Girl in a jacket" width="100" height="100"></img>' + "</td><td>"
            + productos[i].name + "</td><td>"
            + productos[i].measurementUnit + "</td><td>"
            + '<input type="Text" id="cantidad' + productID + '" value="">' + "</td><td>"
            + '<input type="Text" id="precio' + productID + '" value="">' + "</td><td>"
            + '<input type="hidden" id="id' + productID + '" value="' + productID + '">' + "</tr></td>");

        tr2.attr({
            id: "celdas"
        });

        if (i % 2 == 0) {
            tr2.css("background-color", "#E6EFD0");
        }

        tabla.append(tr2);
        var button = '<button class="bUProduct" onclick=update()>Modificar</button>';
    }


    cuerpoTabla.append(tabla);
    cuerpoTabla.append(button);

})
