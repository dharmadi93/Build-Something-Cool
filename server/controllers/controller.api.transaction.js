const models = require('../models')
const Transaction = models.Transaction
const TransactionDetail = models.TransactionDetail
const Item = models.Item

module.exports = {
    createTransaction: (req, res) => {
        Transaction.create({
            faktur: 'faktur-',
            EmployeeId: req.body.employeeId
        }).then((data) => {
            Transaction.findOne({
                id: data.id
            }).then((data) => {
                let cartTemp = req.body.cart
                let cart = JSON.parse(cartTemp)
                for (let i = 0; i < cart.length; i++) {
                    let temp = cart[i].item.split('#')
                    let itemId = temp[0]
                    let name = temp[1]
                    let quantity = temp[2]
                    let price = temp[3]
                    let base_price = temp[4]
                    // console.log(`${itemId} ${name} ${quantity} ${price} ${base_price}`)


                    TransactionDetail.create({
                        ItemId: itemId,
                        quantity: quantity,
                        price: price,
                        base_price: base_price,
                        TransactionId: data.id
                    }).then((data) => {
                        Item.findOne({
                            id: itemId
                        }).then((data) => {
                            Item.update({
                                quantity: data.quantity - quantity
                            }, {
                                where: {
                                    id: data.id
                                }
                            }).then((data) => {
                            //    substrac item quantity
                            }).catch((err) => {
                                res.json(err)
                            })
                        }).catch((err) => {
                            res.json(err)
                        })
                    }).catch((err) => {
                        res.json(err)
                    })

                }
                res.json('Cart has been inserted')
            }).catch((err) => {
                res.json(err)
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllTransaction: (req, res) => {
        Transaction.findAll().catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        })
    },

    getTransactionById: (req, res) => {
        Transaction.findOne({
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        })
    }
}