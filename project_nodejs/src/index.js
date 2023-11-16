const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const app = express();
require('dotenv').config()

const port = process.env.PORT;
const route = require('./routers/index')
const db = require('../src/config/db/database')
app.use(express.static(path.join(__dirname,'public')))

app.engine('hbs', handlebars.create({extname: '.hbs'}).engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resource/views'))
db.connect()
route(app)
app.listen(port, () => {
    console.log("Listening port: http://localhost:" +    port)
})