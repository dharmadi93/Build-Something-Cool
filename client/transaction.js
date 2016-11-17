const URL_ITEM = 'http://localhost:3000/api/item'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getSelectItem()
    getAllCart()

})

function getAllCart() {
    let data = Lockr.getAll()
    let subTotal = 0
    let cart = []
    for (let i = 0; i < data[0].length; i++) {
        let temp = data[0][i].split('#')
        let name = temp[1]
        let price = temp[2]
        let quantity = temp[3]
        let total = quantity * price
        subTotal = subTotal + total
        cart.push(`
            <tr class="text-center">
                <td>${i+1}</td>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>${total}</td>
            </tr>
`)
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
               <option value="${data[i].id}#${data[i].name}#${data[i].price}">${data[i].name}</option> 
`)
    }

    $('#itemSelect').html(item.join(""))
}

$(document).on('click', 'button[name="insertCart"]', function (e) {
    e.preventDefault()
    let item = $('select[name="item"]').val()
    let quantity = $('input[name="quantity"]').val()
    Lockr.sadd('cart', `${item}#${quantity}`);
    getAllCart()
})

$(document).on('click', 'button[name="deleteCart"]', function () {
    Lockr.rm('cart')
    getAllCart()
})