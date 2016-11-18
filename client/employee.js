const URL_EMPLOYEE = 'http://localhost:3000/api/employee'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getUsernameOnNavbar()
    getAllEmployeeList()
})

function getUsernameOnNavbar() {
    $('#userName').html(Auth.getUser().username)
}

function getAllEmployeeList() {
    $.ajax({
        url: `${URL_EMPLOYEE}`,
        method: 'get',
        success: function (data) {
            let employee = []
            for (let i = 0; i < data.length; i++) {
                employee.push(`
                <tr id="employee${data[i].id}">
                    <td>${data[i].name}</td>
                    <td>${data[i].username}</td>
                    <td>${data[i].password}</td>
                    <td>${data[i].email}</td>    
                    <td>${data[i].role}</td>    
                    <td>
                        <a name="buttonEdit" class="btn btn-warning" data-id="${data[i].id}">Edit</a>
                        <a name="buttonDelete" class="btn btn-danger" data-id="${data[i].id}">Delete</a>
                    </td>    
                </tr>
`)
            }

            $('#employeeList').html(employee.join(""))
        }
    })
}

function appendEmployee(data) {
    let html = `
                <tr id="employee${data.id}">
                    <td>${data.name}</td>
                    <td>${data.username}</td>
                    <td>${data.password}</td>
                    <td>${data.email}</td>    
                    <td>${data.role}</td>    
                    <td>
                        <a name="buttonEdit" class="btn btn-warning" data-id="${data.id}">Edit</a>
                        <a name="buttonDelete" class="btn btn-danger" data-id="${data.id}">Delete</a>
                    </td>    
                </tr>
`
    $(`#employeeList`).append(html)
}

function replaceEmployee(data) {
    let html = `
                <tr id="employee${data.id}">
                    <td>${data.name}</td>
                    <td>${data.username}</td>
                    <td>${data.password}</td>
                    <td>${data.email}</td>    
                    <td>${data.role}</td>    
                    <td>
                        <a name="buttonEdit" class="btn btn-warning" data-id="${data.id}">Edit</a>
                        <a name="buttonDelete" class="btn btn-danger" data-id="${data.id}">Delete</a>
                    </td>    
                </tr>
`
    $(`#employee${data.id}`).replaceWith(html)
}

$(document).on('click', 'a[name="buttonDelete"]', function () {
    let employeeId = this.getAttribute('data-id')

    $('#modalConfirm').modal('show')

    $(document).on('click', 'button[id="confirmYes"]', function () {
        deleteEmployee(employeeId)
    })
})

function deleteEmployee(employeeId) {
    let tempId = employeeId
    $.ajax({
        url: `${URL_EMPLOYEE}/${employeeId}`,
        method: 'delete',
        success: function () {
            updateViewAfterDeleteEmployee(tempId)
        }
    })
}

function updateViewAfterDeleteEmployee(employeeId) {
    $(`#employee${employeeId}`).remove()
}

$(document).on('click', 'button[name="buttonCreateEmployee"]', function (e) {
    e.preventDefault()
    let name = $('input[name="name"]').val()
    let username = $('input[name="username"]').val()
    let password = $('input[name="password"]').val()
    let email = $('input[name="email"]').val()
    createEmployee(name, username, password, email)
})

function createEmployee(name, username, password, email) {
    $.ajax({
        url: `${URL_EMPLOYEE}`,
        method: 'post',
        contentType: `${CONTENT_TYPE}`,
        data: {
            name: name,
            username: username,
            password: password,
            email: email,
            role: 'employee'
        },
        success: function (data) {
            updateViewAfterCreateEmployee(data)
        }
    })
}

function updateViewAfterCreateEmployee(data) {
    $('#createEmployeeModal').modal('hide')
    $('input[name="name"]').val('')
    $('input[name="username"]').val('')
    $('input[name="password"]').val('')
    $('input[name="email"]').val('')
    appendEmployee(data)
}

$(document).on('click', 'a[name="buttonEdit"]', function () {
    let employeeId = this.getAttribute('data-id')
    getEmployeForEdit(employeeId)
})

function getEmployeForEdit(employeeId) {
    $.ajax({
        url: `${URL_EMPLOYEE}/${employeeId}`,
        method: 'get',
        success: function (data) {
            $('#editEmployeeModal').modal('show')
            $('input[name="nameEdit"]').val(data.name)
            $('input[name="usernameEdit"]').val(data.username)
            $('input[name="passwordEdit"]').val(data.password)
            $('input[name="emailEdit"]').val(data.email)

            let temp = $("input[name='id']").val()
            if ( typeof temp != "undefined") {
                $("input[name='id']").replaceWith(`<input type='hidden' class='form-control' name='id' value='${data.id}'>`)
            }
            else {
                $("#formEmployeeUpdate").append(`<input type='hidden' class='form-control' name='id' value='${data.id}'>`)
            }
        }
    })
}

$(document).on('click', 'button[name="buttonUpdateEmployee"]', function (e) {
    e.preventDefault()
    let id = $('input[name="id"]').val()
    let name = $('input[name="nameEdit"]').val()
    let username = $('input[name="usernameEdit"]').val()
    let password = $('input[name="passwordEdit"]').val()
    let email = $('input[name="emailEdit"]').val()
    updateEmployee(id, name, username, password, email)
})

function updateEmployee(id, name, username, password, email) {
    $.ajax({
        url: `${URL_EMPLOYEE}/${id}`,
        method: 'put',
        contentType: `${CONTENT_TYPE}`,
        data: {
            name: name,
            username: username,
            password: password,
            email: email
        },
        success: function (data) {
            updateViewAfterUpdateEmployee(data)
        }
    })
}

function updateViewAfterUpdateEmployee(data) {
    $('#editEmployeeModal').modal('hide')
    $('input[name="nameEdit"]').val('')
    $('input[name="usernameEdit"]').val('')
    $('input[name="passwordEdit"]').val('')
    $('input[name="emailEdit"]').val('')
    replaceEmployee(data)
}