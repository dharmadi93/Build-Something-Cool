const models = require('../models')
const Item = models.Item

module.exports = {
    createItem: (req, res) => {
        Item.create({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            base_price: req.body.base_price
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        })
    },

    getAllItems: (req, res) => {
        Item.findAll().catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        })
    },

    getItemById: (req, res) => {
        Item.findOne({
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        })
    },

    deleteItem: (req, res) => {

    },

    updateItem: (req, res) => {

    }
}

