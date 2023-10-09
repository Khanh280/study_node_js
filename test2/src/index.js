const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const app = express();
const port = 3001;
const route = require('./routes')
const db = require('../src/config/db')

// Thiết lập tĩnh thư mục 'uploads' để truy cập hình ảnh đã tải lên
app.use(express.static(path.join(__dirname, 'public/image')));
db.connect()
// mysqlConnection den mysql
db.mysqlConnection.query(
    'SELECT * FROM `brand`',
    function (err, results, fields) {
        console.log(results);
        console.log(fields);
    }
);
app.use(methodOverride('_method'))//ho tro PUT, PATH, DELETE

app.use(express.urlencoded({
    extended: true
}))// middleware dung de nhan du lieu tu form data
app.use(express.json())

app.use(morgan('combined'))

app.engine('hbs', handlebars.create({extname: '.hbs'}).engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

route(app)
app.listen(port, () => {
    console.log("Listening port: http://localhost:" + port)
})