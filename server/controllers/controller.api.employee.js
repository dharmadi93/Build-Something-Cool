const models = require('../models')
const Employee = models.Employee
const passport = require('passport')

module.exports = {
    getAllEmployee: (req, res) => {
        Employee.findAll().then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getEmployeeById: (req, res) => {

    },

    localRegister: (req, res) => {
        Employee.register(new Employee({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            photo_path: "empty"
        }), req.body.password, (err, data) => {
            if (err) res.json(err)
            else res.json(data)
        })
    },

    deleteEmployee: (req, res) => {

    },

    updateEmployee: (req, res) => {

    }
}