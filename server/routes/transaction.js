var express = require('express');
var router = express.Router();

const transactionController = require('../controllers/controller.api.transaction')

router.post('/', transactionController.createTransaction)
router.get('/', transactionController.getAllTransaction)
router.get('/:id', transactionController.getTransactionById)

module.exports = router;
