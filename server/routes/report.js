var express = require('express');
var router = express.Router();

const employeeController = require('../controllers/controller.api.report')

router.get('/', employeeController.getAllReport)
router.get('/employee', employeeController.getReportByEmployee)
router.get('/date', employeeController.getReportByDate)

module.exports = router;
