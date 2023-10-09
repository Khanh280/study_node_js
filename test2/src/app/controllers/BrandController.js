const db = require('../../config/db')
const {multipleSqlToObject} = require('../../utils/mongoose')

class BrandController {
    index(req, res, next) {
        db.mysqlConnection.query(
            'SELECT * FROM `brand`', (err, results, fields) => {
                console.log(results);
                console.log(fields);
                res.render('brandList', {brand: results})
            }
        );
    }

    create(req, res, next) {
        res.render('createBrand')
    }

    save(req, res, next) {
        const brand = req.body
        db.mysqlConnection.query('insert into brand (name) values(?)', [brand.name], (err, result) => {
            console.log(result)
            console.log(result.insertId)
            res.redirect('/brand')
        })
    }

    edit(req, res, next) {
        db.mysqlConnection.query('SELECT * FROM `brand` where id = ?', [req.params.id], (err, result) => {
            console.log(result)
            console.log(result.insertId)
            res.render('brandUpdate', {brand: result[0]})
        })
    }

    update(req, res, next){
        db.mysqlConnection.query('UPDATE brand SET  name = ? where id = ? ', [req.body.name, req.params.id], (err, result) => {
            console.log(result)
            res.redirect('/brand')
        })
    }

    delete(req, res, next) {
        db.mysqlConnection.query('DELETE FROM brand WHERE id = ?', [req.params.id], (err, result) => {
            res.redirect('/brand')
        })
        console.log(req.params.id)
    }

}

module.exports = new BrandController()