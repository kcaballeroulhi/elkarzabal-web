//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES

productos = []
var productos



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

    var tr = $("<tr><th id='cProducto'>Imagen</th><th id='cProducto'>Producto</th><th id='cDescripcion'>Descripción</th><th id='cPrecio'>Unidad de medida</th>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);


    //RECORRER LOS PRODUCTOS
    for (i in productos) {
        var productID = productos[i].id
        var imagen = productos[i].images[0]
        var tr2 = $("<tr><td>"
            + '<img src="' + imagen + '" alt="Girl in a jacket" width="100" height="100"></img>' + "</td><td>"
            + productos[i].name + "</td><td>"
            + productos[i].description + "</td><td>"
            + productos[i].measurementUnit + "</td><td>");
        // + "<button onclick=updateProduct(" + productID + ")>Modificar</button></td > <td>"
        // + "<button onclick=deleteProduct(" + productID + ")>Eliminar</button></td > <td>");

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
