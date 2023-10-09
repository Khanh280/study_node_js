const productRouter = require('./product')

function router(app) {
    app.use('/', productRouter)
}
module.exports = router