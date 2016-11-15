var express = require('express');
var router = express.Router();

const employeeController = require('../controllers/controller.api.employee')

router.post('/', employeeController.createEmployee)
router.get('/', employeeController.getAllEmployee)
router.get('/:id', employeeController.getEmployeeById)
router.put('/:id', employeeController.updateEmployee)
router.delete('/:id', employeeController.deleteEmployee)

module.exports = router;
