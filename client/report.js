const URL_REPORT = 'http://localhost:3000/api/report'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    authUser()
    getUsernameOnNavbar()
    getAllReport()
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

$('input[name="employeeName"], input[name="date"]').bind('keyup change', function () {
    let employee = $('input[name="employeeName"]').val()
    let date = $('input[name="date"]').val()
    getAllReport(employee, date)

})

function getAllReport(employee, date) {

    $.ajax({
        url: `${URL_REPORT}/search?employeeName=${employee}&createdAt=${date}`,
        method: 'get',
        success: function (data) {
            showAllReport(data)
        }
    })

}

function showAllReport(data) {
    let totalProfit = 0
    let report = []
    for (let i = 0; i < data.length; i++) {
        let profit = (data[i].price - data[i].base_price) * data[i].quantity
        totalProfit += profit
        report.push(`
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].TransactionId}</td>
                <td>${data[i].createdAt}</td>
                <td>${data[i].employeeName}</td>
                <td>${data[i].itemName}</td>
                <td>${data[i].quantity}</td>
                <td>${data[i].price}</td>
                <td>${data[i].base_price}</td>
                <td>${profit}</td>
            </tr>
`)
    }

    let html = `
        <tr>
            <td colspan="8" class="text-center">Total</td>
            <td>${totalProfit}</td>
        </tr>
`

    $('#listReport').html(report.join(""))
    $('#totalProfit').html(html)
}
