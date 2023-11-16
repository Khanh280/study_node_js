const productRouter = require('./product')
function route(app) {
    app.use('/',productRouter)
}

module.exports = route