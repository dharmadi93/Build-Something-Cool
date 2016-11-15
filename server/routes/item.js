var express = require('express');
var router = express.Router();

const itemController = require('../controllers/controller.api.item')

router.post('/', itemController.createItem)
router.get('/', itemController.getAllItems)
router.get('/:id', itemController.getItemById)
router.delete('/:id', itemController.deleteItem)
router.put('/:id', itemController.updateItem)
router.put('/quantity/:id', itemController.addItemQuantity)

module.exports = router;
