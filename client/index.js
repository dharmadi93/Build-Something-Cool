const URL_ITEM = 'http://localhost:3000/api/item'

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