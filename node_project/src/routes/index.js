//Router
const productRouter = require('./product')
const authenticationRouter = require('./authentication')
const homeRouter = require('./home')
const userRouter = require('./user')

//Middleware
const middleware = require('../app/middlewareController')

require('dotenv').config();

function route(app) {
    app.use('/home', middleware.verifyToken, homeRouter)
    app.use('/product', middleware.roleAdmin, productRouter)
    app.use('/user',userRouter)
    app.use('/', authenticationRouter)
}

module.exports = route