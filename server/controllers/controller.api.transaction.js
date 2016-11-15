const models = require('../models')
const Transaction = models.Transaction

module.exports = {
    createTransaction: (req, res) => {
        Transaction.create({
            EmployeeId: req.body.employeeId,
            faktur: req.body.faktur
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
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