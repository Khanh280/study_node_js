const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const db = require('../src/config/db')
const route = require('./routes')
const methodOverride = require('method-override')
const app = express()
const port = 3000;

db.connect()

app.use(morgan('combined'))
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('_method'))
app.engine('hbs', handlebars.create({extname: '.hbs'}).engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))
route(app)
app.listen(port, () => {
    console.log("Listening port http://localhost:" + port)
})