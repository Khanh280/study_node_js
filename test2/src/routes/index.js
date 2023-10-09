const homeRouter = require('./home')
const productRouter = require('./product')
const brandRouter = require('./brand')
function route(app) {
    app.use('/', homeRouter)
    app.use('/product',productRouter)
    app.use('/brand',brandRouter)
}

module.exports = route