const models = require('../models')
const Report = models.Report
const moment = require('moment')

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
    },

    getReportByDateAndEmployee: (req, res) => {

        let employeeName = req.query.employeeName
        let createdAt = moment().format(req.query.createdAt)


        console.log(moment().format(createdAt))

        let whereQuery = {}
        if (employeeName) whereQuery['employeeName'] = employeeName
        if (createdAt) whereQuery['createdAt'] = {
            $gt: new Date(createdAt),
            $lt: new Date(createdAt + 24 * 60 * 60 * 1000)
        }
        // console.log(whereQuery)

        Report.findAll({
            where:
                whereQuery
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    }

}