const http = require('http');
const fs = require('fs');
const qs = require('qs');
const url = require('url');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'product_management',
    charset: 'utf8_general_ci'
});

connection.connect(function (err) {
    if (err) {
        throw err.stack;
    } else {
        console.log("connect success");
    }
});

let html = '';

const server = http.createServer((req, res) => {
    let dataFile = '';

    html = '';
    const sqlSelectListProduct =
        'select id, name, price from product';

    connection.query(sqlSelectListProduct, (err, result) => {
        if (err) {
            throw err;
        }

        result.forEach((value, index) => {
            html += `<tr>
                <td>${index + 1}</td>
                <td>${value.name}</td>
                <td>${value.price}</td>
                <td>
                    <button class="btn btn-danger">Delete</button>
                    <button class="btn btn-primary"
                        onclick="goModifyingScreen(${value.id})">Update</button>
                </td>
            </tr>`;
        });
    })

    var parseUrl = url.parse(req.url, true);

    //get the path
    var path = parseUrl.pathname;
    var trimPath = path.replace(/^\/+|\/+$/g, '');
    console.log(path);
    console.log(trimPath);
    console.log(routes[trimPath]);
    var chosenHandler = (typeof (routes[trimPath]) !== 'undefined') ? routes[trimPath] : handlers.notFound;

    if (trimPath === '') {
        chosenHandler = handlers.listProduct;
    }

    if (trimPath !== 'favicon.ico') {
        chosenHandler(req, res);
    }
});

let handlers = {};

handlers.listProduct = function (req, res) {
    fs.readFile('views/list_product.html', 'utf-8', (err, data) => {
        data = data.replace('{listProducts}', html);
        res.write(data);

        return res.end();
    })
}

handlers.addProduct = function (req, res) {
    fs.readFile('views/add_product.html', 'utf-8', (err, dataHTML) => {
        dataHTML = dataHTML.replace('{msg}', '');
        res.write(dataHTML);

        return res.end();
    })
}

handlers.register = function (req, res) {
    fs.readFile('views/add_product.html', 'utf-8', (err, dataHTML) => {

        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {

            // Get info product from screen
            let productObj = qs.parse(data);
            let sqlInsertProduct
                = `insert into product(name, price) values('${productObj.name}', '${productObj.price}')`;

            connection.query(sqlInsertProduct, (errSQL, result) => {
                if (errSQL) {
                    throw errSQL;
                }
                console.log(result);
                dataHTML = dataHTML.replace('{msg}', 'Register successfully!');
                res.write(dataHTML);

                return res.end();
            })
        });
    });
}

handlers.updateProduct = function (req, res) {
    fs.readFile('views/update_product.html', 'utf-8', (err, dataHTML) => {
        dataHTML = dataHTML.replace('{msg}', '');

        var parseUrl = url.parse(req.url, true);
        var queryStringObject = parseUrl.query;

        let sqlSelectProductById =
            `select id, name, price from product where id = ${queryStringObject.id}`;

        connection.query(sqlSelectProductById, (errSQL, result) => {
            if (errSQL) {
                throw errSQL;
            }

            // Display info product
            dataHTML = dataHTML.replace('{nameValue}', result[0].name);
            dataHTML = dataHTML.replace('{priceValue}', result[0].price);
            dataHTML = dataHTML.replace('{idValue}', result[0].id);
            res.write(dataHTML);

            return res.end();
        });
    });
}

handlers.update = function (req, res) {
    fs.readFile('views/update_product.html', 'utf-8', (err, dataHTML) => {

        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {

            // Get info product from screen
            let productForm = qs.parse(data);

            let sqlUpdateProduct =
                `update product 
                set name = '${productForm.name}', price = '${productForm.price}'
                where id = ${productForm.id}`;

            connection.query(sqlUpdateProduct, (errSQL, result) => {
                if (errSQL) {
                    throw errSQL;
                }

                dataHTML = dataHTML.replace('{nameValue}', productForm.name);
                dataHTML = dataHTML.replace('{priceValue}', productForm.price);
                dataHTML = dataHTML.replace('{idValue}', productForm.id);
                dataHTML = dataHTML.replace('{msg}', 'Update successfully!');
                res.write(dataHTML);

                return res.end();
            });
        });
    });
}

let routes = {
    'listProduct': handlers.listProduct,
    'addProduct': handlers.addProduct,
    'register': handlers.register,
    'updateProduct': handlers.updateProduct,
    'update': handlers.update
};

server.listen(8080, () => {
    console.log('Server startup 8080...')
});


// string to obj: JSON.parse
// object to string: JSON.stringify
