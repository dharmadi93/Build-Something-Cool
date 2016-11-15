var express = require('express');
var router = express.Router();

const itemController = require('../controllers/')

router.post('/register', employeeController.localRegister)
router.get('/', employeeController.getAllEmployee)
router.get('/:id', employeeController.getEmployeeById)
router.put('/:id', employeeController.updateEmployee)
router.delete('/:id', employeeController.deleteEmployee)

module.exports = router;
