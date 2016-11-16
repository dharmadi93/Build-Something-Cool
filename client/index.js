$(document).ready(function () {
    getUsernameOnNavbar()
})

function getUsernameOnNavbar() {
    $('#userName').html(Auth.getUser().username)
}

//LOGOUT
$(document).on('click', 'a[name="userLogout"]', function () {
    Auth.deauthenticateUser()
    window.location = '/login'.html
})