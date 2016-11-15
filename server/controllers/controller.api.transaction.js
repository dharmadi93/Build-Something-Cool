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

    },

    getTransactionById: (req, res) => {

    }
}