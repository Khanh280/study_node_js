const Product = require('../models/Product')
const {multipleMongooseToObject} = require('../../utils/mongoose')

class HomeController {
    index(req, res, next) {
        Product.find()
            .then((product) => {
                res.render('home', {
                    product: multipleMongooseToObject(product)
                })
            })
            .catch((err) => next(err))
    }
}

module.exports = new HomeController();