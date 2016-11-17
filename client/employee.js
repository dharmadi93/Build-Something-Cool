const URL_EMPLOYEE = 'http://localhost:3000/api/employee'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getAllEmployeeList()
})

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

function replaceEmployee(data) {
    let html = `
                <tr id="employee${data.id}">
                    <td>${data.name}</td>
                    <td>${data.username}</td>
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
    replaceEmployee(data)
}