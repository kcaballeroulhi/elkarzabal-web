//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES

productos = []
var productos
const URL = "http://localhost:3000/api/"


function updateProduct(id) {
    window.open("./updateForm.html?id=" + id)
}

function deleteProduct(id) {
    console.log(productos[i].name)
    $.ajax({
        async: false,
        url: URL + "product/" + id,
        type: 'DELETE',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success:
            alert(productos[i].name + " borrado")
        ,

        error: function () {
            alert("Revisa tu conexión");
        }
    });
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

    var tr = $("<tr><th id='cProducto'>Producto</th><th id='cDescripcion'>Descripción</th><th id='cPrecio'>Unidad de medida</th>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);

    //RECORRER LOS PRODUCTOS
    for (i in productos) {
        var productID = productos[i].id
        var tr2 = $("<tr><td>"
            + productos[i].name + "</td><td>"
            + productos[i].description + "</td><td>"
            + productos[i].measurementUnit + "</td><td>"
            + "<button onclick=updateProduct(" + productID + ")>Modificar</button></td><td>"
            + "<button onclick=deleteProduct(" + productID + ")>Eliminar</button></td><td>");

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
