var express = require('express');
var router = express.Router();

const transactionController = require('../controllers/controller.api.transaction')

//TRANSACTION
router.post('/', transactionController.createTransaction)
router.get('/', transactionController.getAllTransaction)
router.get('/:id', transactionController.getTransactionById)

//TRANSACTION DETAIL


module.exports = router;
