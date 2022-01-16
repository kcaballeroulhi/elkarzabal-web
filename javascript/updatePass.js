var BBDDpass = ""
$.ajax({
    url: URL + "user/profile",
    type: 'GET',
    headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
    success: function (result) {
        BBDDpass = result.password;
    },
    error: function () {
        alert("Revisa tu conexión");
    }
});

function updatePass(password) {
    $.ajax({
        method: "PATCH",
        url: URL + "user",
        headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        data: JSON.stringify({
            "password": password,
        }),
        contentType: "application/json",
        success: function (data) {
            alert("actualizado correctamente")
        },
        error: function (e) {
            console.log(e)
        }
    });
}

function updateUser() {
    var decriptLastPassword = document.getElementById("lastPassword").value;
    var lastPassword = hex_sha1(decriptLastPassword)
    var decriptNextPassword = document.getElementById("newPassword").value;
    var nextPassword = hex_sha1(decriptNextPassword)
    var decriptRepeatPassword = document.getElementById("repeatPassword").value;
    var repeatPassword = hex_sha1(decriptRepeatPassword)
    if (lastPassword === BBDDpass) {
        if (nextPassword === repeatPassword) {
            //cambiar contraseña
            updatePass(nextPassword)
        } else {
            alert("las contraseñas no coinciden")
        }
    } else {
        alert("La contraseña actual no es correcta")
    }
}
