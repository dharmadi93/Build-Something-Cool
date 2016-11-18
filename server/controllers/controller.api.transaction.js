const models = require('../models')
const Transaction = models.Transaction
const TransactionDetail = models.TransactionDetail
const Report = models.Report
const Item = models.Item

module.exports = {
    createTransaction: (req, res) => {
        let employeeName = req.body.employeeName
        Transaction.create({
            faktur: 'faktur-',
            EmployeeId: req.body.employeeId
        }).then((data) => {
            Transaction.findOne({
                where: {
                    id: data.id
                }
            }).then((data) => {
                let tempTransactionId = data.id
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
                            where: {
                                id: itemId
                            }
                        }).then((data) => {
                            Item.update({
                                quantity: data.quantity - quantity
                            }, {
                                where: {
                                    id: data.id
                                }
                            })
                        })
                    }).then((data) => {
                        Report.create({
                            TransactionId: tempTransactionId,
                            employeeName: employeeName,
                            itemName: name,
                            quantity: quantity,
                            price: price,
                            base_price: base_price
                        })
                    })
                }
                res.json('Cart has been inserted')
            })
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllTransaction: (req, res) => {
        Transaction.findAll({
            include: [
                {
                    model: Employee
                }
            ]
        }).then((data) => {
            let data_array = []
            for (let i = 0; i < data.length; i++) {
                data_array.push(data[i])
            }
            // console.log(data_array)
            res.json(data_array)
        }).catch((err) => {
            res.json(err)
        })
    },

    getAllTransactionByEmployeeId: (req, res) => {
        Transaction.findAll({
            where: {
                EmployeeId: req.params.id
            }
        }).catch((err) => {
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