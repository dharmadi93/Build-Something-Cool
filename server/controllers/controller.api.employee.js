const models = require('../models')
const Employee = models.Employee
const jwt = require('jsonwebtoken')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, `public/images`)
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage }).single('photo')

module.exports = {
    getAllEmployee: (req, res) => {
        Employee.findAll().then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getEmployeeById: (req, res) => {
        Employee.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    createEmployee: (req, res) => {

        upload(req, res, function (err) {
            if (err) {
                console.log(err);
                return res.json('Error uploading file!', err)
            }
            else if (req.file.filename) {
                Employee.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    photo_path: req.file.filename,
                    role: 'employee'
                }).then((data) => {
                    res.json(data)
                }).catch((err) => {
                    res.json(err)
                })
            }
            else {
                res.json('Error no file!', err)
            }
        })
    },

    // localRegister: (req, res) => {
    //     Employee.register(new Employee({
    //         name: req.body.name,
    //         username: req.body.username,
    //         email: req.body.email,
    //         photo_path: "empty"
    //     }), req.body.password, (err, data) => {
    //         if (err) res.json(err)
    //         else res.json(data)
    //     })
    // },

    deleteEmployee: (req, res) => {
        Employee.destroy({
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        })
    },

    updateEmployee: (req, res) => {
        Employee.update({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }, {
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then(Employee.findOne({
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        }))
    },

    loginEmployee: (req, res) => {
        Employee.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            if (!data) return res.status(400).json('No User Found')
            else {
                return res.status(200).json({
                    token: jwt.sign({
                        userId: data.id,
                        username: data.username,
                        role: data.role
                    }, process.env.SESSION_SECRET)
                })
            }
        })
    }
}