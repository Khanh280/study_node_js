const Product = require('../models/Product')
const Brand = require('../models/Brand')
const ProductType = require('../models/ProductType')
const mongoseConvertDB = require('../../utils/mongoseConvertDB')

class ProductController {
    index(req, res, next) {
        Product.find()
            .populate('brands producttypes')
            .then(product => {
                console.log(product)
                res.render('list', {product: mongoseConvertDB.multipleMongoToObject(product)})
            })
            .catch(err => console.log(err))
    }
}

module.exports = new ProductController();