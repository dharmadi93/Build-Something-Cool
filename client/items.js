const URL_ITEM = 'http://localhost:3000/api/item'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

$(document).ready(function () {
    getUsernameOnNavbar()
    // $('#itemTable').DataTable();
    getItemsList()

})

function getUsernameOnNavbar() {
    $('#userName').html(Auth.getUser().username)
}

//LOGOUT
$(document).on('click', 'a[name="userLogout"]', function () {
    Auth.deauthenticateUser()
    window.location = '/login'.html
})

function getItemsList() {
    $.ajax({
        url: `${URL_ITEM}`,
        method: 'get',
        success: function (data) {
            let item = []
            for (let i = 0; i < data.length; i++) {
                item.push(`
                
                <tr>
                    <td>${data[i].name}</td>
                    <td>${data[i].quantity}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].base_price}</td>    
                </tr>
                
`)
                $('#itemList').html(item.join(""))
            }
        }
    })
}

$(document).on('click', 'button[name="buttonCreateItem"]', function (e) {
    e.preventDefault()
    let name = $('input[name="name"]').val()
    let quantity = $('input[name="quantity"]').val()
    let price = $('input[name="price"]').val()
    let basePrice = $('input[name="basePrice"]').val()
    createItem(name, quantity, price, basePrice)
})

function createItem(name, quantity, price, basePrice) {
    $.ajax({
        url: `${URL_ITEM}`,
        method: 'post',
        contentType: `${CONTENT_TYPE}`,
        data: {
            name: name,
            quantity: quantity,
            price: price,
            base_price: basePrice
        },
        success: function (data) {
            updateViewAfterCreateItem(data)
        }
    })
}

function updateViewAfterCreateItem(data) {
    let html = `
        <tr>
            <td>${data.name}</td>
            <td>${data.quantity}</td>
            <td>${data.price}</td>
            <td>${data.base_price}</td>    
        </tr>
`
    $('#createItemModal').modal('hide')
    $('input[name="name"]').val('')
    $('input[name="quantity"]').val('')
    $('input[name="price"]').val('')
    $('input[name="basePrice"]').val('')
    $('#itemList').append(html)
}