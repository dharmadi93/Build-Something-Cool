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
                
                <tr id="item${data[i].id}">
                    <td>${data[i].name}</td>
                    <td>${data[i].quantity}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].base_price}</td>    
                    <td>
                        <a name="buttonEdit" class="btn btn-warning" data-id="${data[i].id}">Edit</a>
                        <a name="buttonDelete" class="btn btn-danger" data-id="${data[i].id}">Delete</a>
                    </td>    
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
        <tr id="item${data.id}">
            <td>${data.name}</td>
            <td>${data.quantity}</td>
            <td>${data.price}</td>
            <td>${data.base_price}</td>
            <td>
                <a name="buttonEdit" class="btn btn-warning" data-id="${data.id}">Edit</a>
                <a name="buttonDelete" class="btn btn-danger" data-id="${data.id}">Delete</a>
            </td>
        </tr>
`
    $('#createItemModal').modal('hide')
    $('input[name="name"]').val('')
    $('input[name="quantity"]').val('')
    $('input[name="price"]').val('')
    $('input[name="basePrice"]').val('')
    $('#itemList').append(html)
}

$(document).on('click', 'a[name="buttonDelete"]', function () {
    let itemId = this.getAttribute('data-id')
    deleteItem(itemId)
})

function deleteItem(itemId) {
    let tempId = itemId
    $.ajax({
        url: `${URL_ITEM}/${itemId}`,
        method: 'delete',
        success: function () {
            updateViewAfterDeleteItem(tempId)
        }
    })
}

function updateViewAfterDeleteItem(itemId) {
    $(`#item${itemId}`).remove()
}