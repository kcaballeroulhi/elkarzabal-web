var previousPass = "";
var nextPass = ""
var id = "";
$.ajax({
    url: URL + "user/profile",
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (result) {
        id = result.id;
        console.log(id);
        document.getElementById("name").value = result.name;
        document.getElementById("lastname").value = result.lastname;
        document.getElementById("password").value = result.password;
        previousPass = result.password
        document.getElementById("email").value = result.email;
        document.getElementById("phone").value = result.phone;
        document.getElementById("role").value = result.roleId;
    },
    error: function () {
        alert("Revisa tu conexión");
    }
});

function updateUser() {
    var name = document.getElementById("name").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    nextPass = password
    var role = document.getElementById("role").value;
    var languageCombo = document.getElementById("language").value;
    var groupCombo = document.getElementById("group")
    var group = groupCombo.options[groupCombo.selectedIndex].text;
    //console.log(group)
    if (languageCombo === 1) {
        var language = "ESP";
    } else {
        var language = "EUS";
    }
    if (nextPass === previousPass) {
        var encryptPass = previousPass
    } else {
        var encryptPass = hex_sha1(nextPass)
    }

    $.ajax({
        method: "PATCH",
        url: URL + "user/" + id,
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        data: JSON.stringify({
            "name": name,
            "lastname": lastname,
            "phone": phone,
            "email": email,
            "password": encryptPass,
            "roleId": parseInt(role),
            "language": language,
            "group": group

        }),
        contentType: "application/json",
        success: function (data) {
            alert("Usuario " + name + " " + lastname + " añadido correctamente")
        },
        error: function (e) {
            console.log(e)
        }
    });
}