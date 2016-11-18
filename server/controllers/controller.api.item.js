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
        Item.findAll().then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
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
        Item.destroy({
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        })
    },

    updateItem: (req, res) => {
        Item.update({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            base_price: req.body.base_price
        }, {
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then(Item.findOne({
            where: {
                id: req.params.id
            }
        }).catch((err) => {
            res.json(err)
        }).then((data) => {
            res.json(data)
        }))
    },

    addItemQuantity: (req, res) => {
        Item.findOne({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            Item.update({
                quantity: data.quantity + Number(req.body.quantity)
            }, {
                where: {
                    id: req.params.id
                }
            }).then(Item.findOne({
                where: {
                    id: req.params.id
                }
            }).catch((err) => {
                res.json(err)
            }).then((data) => {
                res.json(data)
            }).catch((err) => {
                res.json(err)
            }))
        }).catch((err) => {
            res.json(err)
        })
    },

    getItemCart: (req, res) => {
        Item.find({
            where: {
                id: req.params.id
            }
        }).then((data) => {
            res.json(data)
        }).catch((err) => {
            res.json(err)
        })
    }
}

