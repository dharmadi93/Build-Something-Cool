var express = require('express');
var router = express.Router();

const itemController = require('../controllers/controller.api.item')

router.post('/', itemController.createItem)
router.get('/', itemController.getAllItems)
router.get('/:id')
router.put('/:id')
router.delete('/:id')

module.exports = router;
