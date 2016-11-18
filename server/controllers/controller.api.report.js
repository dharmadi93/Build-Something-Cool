const models = require('../models')
const Report = models.Report

module.exports = {
    getAllReport: (req, res) => {
        Report.findAll().then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getReportByEmployee: (req, res) => {
        Report.findAll({
            where: {
                employeeName: req.query.employeeName
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    },

    getReportByDate: (req, res) => {
        Report.findAll({
            where: {
                createdAt: req.query.createdAt
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    }

}