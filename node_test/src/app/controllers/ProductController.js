const Product = require('../models/Product')
const {mutipleMongooseToArray, mongooseToObject} = require('../../utils/service')

class ProductController {

    index(req, res, next) {
        Product.find()
            .then((product) => res.render('home', {
                product: mutipleMongooseToArray(product)
            }))
            .catch(next)
    }

    create(req, res, next) {
        res.render('create')
    }

    save(req, res, next) {
        const product = new Product(req.body)
        product.save().then(() => res.redirect('/'))
    }

    edit(req, res, next) {
        Product.findById({_id: req.params.id})
            .then(product => res.render('update', {product: mongooseToObject(product)}))
            .catch(next)
    }

    update(req, res, next) {
        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/'))
            .catch(next)
    }

    delete(req, res, next) {
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('/'))
            .catch(next)
    }
}

module.exports = new ProductController()