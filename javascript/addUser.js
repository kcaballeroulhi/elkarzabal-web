


function createNewUser() {
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var role = document.getElementById("role").value;
    var encryptPass = hex_sha1(password)

    $.ajax({
        method: "POST",
        url: URL + "register",
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        data: JSON.stringify({
            "name": name,
            "lastname": lastname,
            "phone": phone,
            "email": email,
            "password": encryptPass,
            "roleId": parseInt(role),
            "address": address,
            "roleId": parseInt(role)

        }),
        contentType: "application/json",
        success: function (data) {
            alert("Usuario " + data.name + " " + data.lastname + " añadido correctamente")
            window.location.replace('./deleteUser.html')
        },
        error: function (e) {
            console.log(e)
        }
    });
}
