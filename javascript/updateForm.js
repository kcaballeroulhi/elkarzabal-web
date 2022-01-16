$.ajax({
    url: URL + "product/" + urlID,
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (result) {
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
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var measurement = document.getElementById("measurement").value;


    $.ajax({
        method: "PATCH",
        url: URL + "product/" + urlID,
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        data: JSON.stringify({
            "name": name,
            "description": description,
            "measurementUnit": measurement,


        }),
        contentType: "application/json",
        success: function (data) {
            alert(name + " " + "actualizado correctamente")
        },
        error: function (e) {
            console.log(e)
        }
    });
}