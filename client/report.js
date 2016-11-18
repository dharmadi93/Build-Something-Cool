const URL_REPORT = 'http://localhost:3000/api/report'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getAllReport()
})
function getAllReport() {
    $.ajax({
        url: `${URL_REPORT}`,
        method: 'get',
        success: function (data) {
            showAllReport(data)
        }
    })
}

function showAllReport(data) {
    let report = []
    for (let i = 0; i < data.length; i++) {
        let profit = (data[i].price - data[i].base_price) * data[i].quantity
        report.push(`
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].TransactionId}</td>
                <td>${data[i].EmployeeName}</td>
                <td>${data[i].itemName}</td>
                <td>${data[i].quantity}</td>
                <td>${data[i].price}</td>
                <td>${data[i].base_price}</td>
                <td>${profit}</td>
            </tr>
`)
    }

    $('#listReport').html(report.join(""))
}