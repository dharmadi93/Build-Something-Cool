const URL_ITEM = 'http://localhost:3000/api/item'
const URL_TRANSACTION = 'http://localhost:3000/api/transaction'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getSelectItem()
    getAllCart()
    getAllTransaction()
})

function getAllCart() {
    let data = Lockr.get('cart')
    let subTotal = 0
    let cart = []
    if (typeof data != 'undefined') {
        for (let i = 0; i < data.length; i++) {
            let temp = data[i].item.split('#')
            let name = temp[1]
            let quantity = temp[2]
            let price = temp[3]
            let total = quantity * price
            subTotal = subTotal + total
            cart.push(`
            <tr class="text-center">
                <td>${i + 1}</td>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>${total}</td>
            </tr>
`)
        }
    }

    cart.push(`
    <tr class="text-center">
        <td colspan="4">Sub Total</td>
        <td>${subTotal}</td>
    </tr>
`)

    $('#listCart').html(cart.join(""))
}

function getSelectItem() {
    $.ajax({
        url: `${URL_ITEM}`,
        method: 'get',
        success: function (data) {
            showSelectItem(data)
        }
    })
}

function showSelectItem(data) {
    let item = []
    for (let i = 0; i < data.length; i++) {
        item.push(`
               <option value="${data[i].id}#${data[i].name}#${data[i].price}#${data[i].base_price}">${data[i].name}</option> 
`)
    }

    $('#itemSelect').html(item.join(""))
}

$(document).on('click', 'button[name="insertCart"]', function (e) {
    e.preventDefault()
    insertCart()
})

function insertCart() {
    let itemTemp = $('select[name="item"]').val().split('#')
    let id = itemTemp[0]
    let item = itemTemp[1]
    let price = itemTemp[2]
    let base_price = itemTemp[3]

    let quantity = $('input[name="quantity"]').val()
    Lockr.sadd('cart', {item: `${id}#${item}#${quantity}#${price}#${base_price}`});
    getAllCart()
}

$(document).on('click', 'button[name="deleteCart"]', function () {
    Lockr.rm('cart')
    getAllCart()
})

$(document).on('click', 'button[name="checkout"]', function () {
    let data = Lockr.get('cart')
    let temp = JSON.stringify(data)
    let employeeId = Auth.getUser().userId
    let employeeName = Auth.getUser().username
    console.log(temp)
    $.ajax({
        url: `${URL_TRANSACTION}`,
        method: `post`,
        contentType: `${CONTENT_TYPE}`,
        data: {
            employeeId: employeeId,
            employeeName: employeeName,
            cart: temp
        },
        success: function (data) {
            Lockr.rm('cart')
            getAllCart()
            alert(data)
        }
    })
})


function getAllTransaction() {
    $.ajax({
        url: `${URL_TRANSACTION}`,
        method: 'get',
        success: function (data) {
            showAlltransaction(data)
        }
    })
}

function showAlltransaction(data) {
    let transaction = []
    for (let i = 0; i < data.length; i++) {
        transaction.push(`
            <tr>
                <td>${data[i].id}</td>
                <td>${data[i].EmployeeId}</td>
                <td>${data[i].createdAt}</td>
            </tr> 
`)
    }

    $('#transactionList').html(transaction.join(""))
}