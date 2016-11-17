const URL_EMPLOYEE = 'http://localhost:3000/api/employee'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getEmployeeList()
})

function getEmployeeList() {
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