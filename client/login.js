const URL_EMPLOYEE = 'http://localhost:3000/api/employee'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    authUser()
})

function authUser() {
    if (Auth.getToken()) window.location = '/'
}

$(document).on('click', 'button[name="buttonLogin"]', function (e) {
    e.preventDefault()
    let username = $('input[name="usernameLogin"]').val()
    let password = $('input[name="passwordLogin"]').val()
    loginUser(username, password)
})

function loginUser(username, password) {
    $.ajax({
        url: `${URL_EMPLOYEE}/login`,
        method: `post`,
        contentType: `${CONTENT_TYPE}`,
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            Auth.authenticateUser(data)
            window.location = '/'
        },
        error: function (data) {
            alert('Wrong username or password')
        }
    })
}

$(document).on('click', 'button[name="buttonRegister"]', function (e) {
    e.preventDefault()
    let name = $('input[name="name"]').val()
    let username = $('input[name="username"]').val()
    let password = $('input[name="password"]').val()
    let email = $('input[name="email"]').val()
    registerUser(name, username, password, password)
})

function registerUser(name, username, password, email) {
    $.ajax({
        url: `${URL_EMPLOYEE}`,
        method: 'post',
        dataType: `${CONTENT_TYPE}`,
        data: {
            name: name,
            username: username,
            password: password,
            email: email,
            role: 'employee'
        },
        success: function (data) {
            console.log(data)
            Auth.authenticateUser(data)
            window.location = '/'
        }
    })
}