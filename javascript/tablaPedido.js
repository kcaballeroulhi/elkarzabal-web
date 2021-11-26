//CREAR LA PETICION DE LOS PRODUCTOS SEMANALES

$(document).ready(function(){
    var cuerpoTabla = $('#cuerpoTablaPedido');

    var tabla = $("<table></table>");
       tabla.attr({
       id:"tabla"});    

    var tr = $("<tr><th id='cProducto'>Producto</th><th id='cDescripcion'>Descripción</th><th id='cPrecio'>Precio</th><th id='cStock'>Stock</th><th id='cCantidad'>Cantidad</th><th id='cAnadir'>Añadir producto</th></tr>");
       tr.attr({
       id:"columnas"});  

    tabla.append(tr);

    //RECORRER LOS PRODUCTOS
    for(i in productos) {

        var tr2 = $("<tr><td>"
                    +/*NOMBRE PRODUCTO*/+"</td><td>"
                    +/*DESCRIPCIÓN*/+"</td><td>"
                    +/*PRECIO*/+"</td><td>"
                    +/*STOCK*/+"</td><td>"
                    +"<input id='iCantidad' type='number' name='cantidad' min='1'/>"+"</td><td>"
                    +"<a href='' onclick=''><img id='iBoton' src='./images/add.svg'></a>"+"</td></tr>");
            tr2.attr({
            id:"celdas"});  

        if(i%2 == 0) {
            tr2.css("background-color", "#E6EFD0");
        }

        tabla.append(tr2);
    }

    cuerpoTabla.append(tabla);
})
