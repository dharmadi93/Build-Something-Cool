var express = require('express');
var router = express.Router();

const employeeController = require('../controllers/controller.api.employee')

router.post('/register', employeeController.localRegister)
router.get('/', employeeController.getAllEmployee)
router.get('/:id', employeeController.getEmployeeById)

module.exports = router;
