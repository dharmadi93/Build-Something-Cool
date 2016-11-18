$(document).ready(function () {
    authUser()
    getUsernameOnNavbar()
    getItemsList()

})

function getUsernameOnNavbar() {
    $('#userName').html(Auth.getUser().username)
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