$(document).ready(function () {
    authUser()
    getUsernameOnNavbar()
    sideNav()
    console.log(Auth.getUser())
})

function getUsernameOnNavbar() {
    $('#userName').html(Auth.getUser().username)
}

function sideNav() {
    if (Auth.getUser().role != 'admin') {
        $('#navEmployee').addClass('hidden')
        $('#navItem').addClass('hidden')
        $('#navReport').addClass('hidden')
    }
}

$(document).on('click', 'a[name="userLogout"]', function () {
    logout()
})

function authUser() {
    if (!Auth.getToken()) window.location = '/login.html'
}

function logout() {
    Auth.deauthenticateUser()
    window.location = '/login.html'
}