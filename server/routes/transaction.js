var express = require('express');
var router = express.Router();

const transactionController = require('../controllers/controller.api.transaction')

router.post('/', transactionController.createTransaction)
// router.get('/', transactionController.getAllItems)
// router.get('/:id', itemController.getItemById)

module.exports = router;
