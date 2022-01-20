//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES

productos = []
var productos

function updateProduct(id) {
    window.location.replace("./updateForm.html?id=" + id);

}

function deleteProduct(id) {
    console.log(productos[i].name)
    var deleteID = 0
    console.log(deleteID)
    //conseguir id imagen del producto a borrar
    $.ajax({
        async: false,
        url: URL + "product/" + id,
        type: 'GET',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function (data) {
            console.log(data.images[0].id)
            deleteID = data.images[0].id;
        }
        ,
        error: function () {
            alert("Revisa tu conexión");
        }
    });

    // borrar la imagen
    if (deleteID !== 0) {
        $.ajax({
            async: false,
            url: URL + "product-image/" + deleteID,
            type: 'DELETE',
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            error: function () {
                alert("Revisa tu conexión llll");
            }
        });
    }

    //borrar producto
    $.ajax({
        async: false,
        url: URL + "product/" + id,
        type: 'DELETE',
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        success: function () {
            alert(productos[i].name + " borrado"),
                location.reload()
        },
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

    var tr = $("<tr><th id='cProducto'>Imagen</th><th id='cProducto'>Producto</th><th id='cDescripcion'>Descripción</th><th id='cPrecio'>Unidad de medida</th><th id='cPrecio'>Modificar</th><th id='cPrecio'>Eliminar</th>");
    tr.attr({
        id: "columnas"
    });

    tabla.append(tr);

    //RECORRER LOS PRODUCTOS
    for (i in productos) {
        var productID = productos[i].id
        var imagen = productos[i].images[0]
        var tr2 = $("<tr><td>"
            + '<img id="imgListProd" src="' + imagen + '" alt="Girl in a jacket" width="50" height="50"></img>' + "</td><td>"
            + productos[i].name + "</td><td>"
            + productos[i].description + "</td><td>"
            + productos[i].measurementUnit + "</td><td>"
            + "<button class='bUProduct' onclick=updateProduct(" + productID + ")><img id='bUP1' class='bUImage' src='./images/edit.svg' /></button></td><td>"
            + "<button class='bUProduct' onclick=deleteProduct(" + productID + ")><img id='bUP2' class='bUImage' src='./images/delete.svg' /></button></td><td>");

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
