const Product = require('../models/Product')
const {multipleMongooseToObject} = require('../../utils/mongoose')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRETKEY
class HomeController {
    list(req, res, next) {
        const statusLogin = req.session.statusLogin === true;
        const statusSave = req.session.statusSave === true;
        const statusDelete = req.session.statusDelete === true;
        delete req.session.statusDelete;
        delete req.session.statusLogin;
        delete req.session.statusSave;
        Product.find()
            .populate('brands types')
            .exec()
            .then((product) => {
                const arr  = multipleMongooseToObject(product);

                // console.log(data)
                // console.log(secretKey)
                const token = req.cookies.token
                const decode = jwt.verify(token, secretKey)
                res.render('list_product', {
                    product: multipleMongooseToObject(product),
                    statusLogin: req.cookies.token ? true : false,
                    messageLogin: statusLogin,
                    statusSave: statusSave,
                    statusDelete: statusDelete,
                    username: decode.username
                })
            })
            .catch((err) =>
                console.log('JOIN  FAIL ' + err)
            )
    }
}

module.exports = new HomeController();