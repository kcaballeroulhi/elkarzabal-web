var nombre = ""
var description = ""
var measurement = ""
var image = ""
var imageID = 0
$.ajax({
    url: URL + "product/" + urlID,
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (result) {
        imageID = document.getElementById("image").src = result.images[0].id;
        nombre = result.name;
        description = result.description;
        measurement = result.measurementUnit;
        image = result.images[0].filename;
        document.getElementById("name").value = result.name;
        document.getElementById("description").value = result.description;
        document.getElementById("measurement").value = result.measurementUnit;
        document.getElementById("image").src = result.images[0].filename;
    },
    error: function () {
        alert("Revisa tu conexión");
    }
});

function updateProduct() {
    var newName = document.getElementById("name").value;
    var newDescription = document.getElementById("description").value;
    var newMeasurement = document.getElementById("measurement").value;
    var newImage = document.getElementById("imagen").value;

    if (newImage !== '') {
        //actualizar imagen
        var miData = new FormData();
        miData.append('file', imagen.files[0])
        $.ajax({
            method: "PATCH",
            url: URL + "product-image/" + imageID,
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            data: miData,
            contentType: false,
            processData: false,
            success: function (data) {
                alert(newName + " " + "actualizado correctamente")
            },
            error: function (e) {
                console.log(e)
            }
        });

    }

    if ((newName !== nombre) || (newDescription !== description) || (newMeasurement !== measurement)) {
        //actualizar producto
        $.ajax({
            method: "PATCH",
            url: URL + "product/" + urlID,
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            data: JSON.stringify({
                "name": newName,
                "description": newDescription,
                "measurementUnit": newMeasurement,
            }),
            contentType: "application/json",
            success: function (data) {
                alert(data.name + " " + "actualizado correctamente")
            },
            error: function (e) {
                console.log(e)
            }
        });
    }
}