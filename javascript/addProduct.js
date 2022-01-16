function createProduct() {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var measure = document.getElementById("measure").value;
    var image = document.getElementById("imagen").value;
    console.log(image)
    if (imagen.files.length === 1) {
        var miProduct = new FormData();
        miProduct.append('name', name);
        miProduct.append('description', description);
        miProduct.append('measurementUnit', measure);
        miProduct.append('files', imagen.files[0])
    }
    else {
        var miProduct = new FormData();
        miProduct.append('name', name);
        miProduct.append('description', description);
        miProduct.append('measurementUnit', measure);
    }

    $.ajax({
        async: false,
        type: 'POST',
        url: URL + "product",
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        data: miProduct,
        contentType: false,
        processData: false,
        success: function (data) {
            console.log(data)
            alert(data.name + " añadido correctamente")
        },
        error: function (e) {
            console.log(e)
        }
    });
}

