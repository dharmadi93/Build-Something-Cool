const models = require('../models')
const Transaction = models.Transaction
const TransactionDetail = models.TransactionDetail
const Item = models.Item

module.exports = {
    createTransaction: (req, res) => {
        Transaction.create({
            EmployeeId: req.body.employeeId,
            faktur: req.body.faktur
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            TransactionDetail.create({
                ItemId: req.body.ItemId,
                quantity: req.body.quantity,
                price: req.body.price,
                base_price: req.body.base_price,
                TransactionId: data.id
            }).catch((err) => {
                res.json(err)
            }).then((data) => {
                Item.findOne({
                    where: {
                        id: data.ItemId
                    }
                }).catch((err) => {
                    res.json(err)
                }).then((data) => {
                    Item.update({
                        quantity: data.quantity - Number(req.body.quantity)
                    }, {
                        where: {
                            id: data.id
                        }
                    }).catch((err) => {
                        res.json(err)
                    }).then((data) => {
                        res.json(data)
                    })
                })
            })
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